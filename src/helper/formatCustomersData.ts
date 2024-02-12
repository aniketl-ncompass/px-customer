import { mockCustomers, mockCustomersListSettings } from "../mockData.js";
import { AvailableSalesRep, Customer, CustomerListSetting, EnabledTags, RegistrationStatus } from "../types.js";

const salesRepCounts = (customersCopy: Customer[], salesRepId: number) => {
    return customersCopy.reduce((total: number, customer: Customer) => {
        if (customer.salesRepId === salesRepId) {
            total++;
        }
        return total;
    }, 0);
}

const getTotalAvailableSalesResp = (customersCopy: Customer[]) => {
    return customersCopy.reduce((unique: AvailableSalesRep[], customer: Customer) => {
        if (!unique.some(rep => rep.salesRepId === customer.salesRepId)) {
            const totalCustomers = salesRepCounts(customersCopy, customer.salesRepId);
            unique.push({ salesRepId: customer.salesRepId, salesRepName: customer.salesRepName, count: totalCustomers });
        }
        return unique;
    }, []);
}

const getUniqueTags = (customersCopy: Customer[]): string[] => {
    let uniqueTags: Set<string> = new Set();

    customersCopy.forEach((customer: Customer) => {
        if (customer.enabledTags) {
            customer.enabledTags.forEach(tag => {
                uniqueTags.add(tag);
            });
        }
        else {
            uniqueTags.add("(Blanks)")
        }
    });

    return Array.from(uniqueTags);
}

const allEnabledTags = (customersCopy: Customer[], customers?: Customer[]) => {
    let nullCount: number = 0;
    let counts: any[] = [];

    if (customers) {
        counts = getUniqueTags(customers).map((tag: string) => {
            let count = customersCopy.reduce((count: number, customer: Customer) => {
                return count + ((customer.enabledTags && customer.enabledTags.includes(tag)) || (!customer.enabledTags && tag === "(Blanks)") ? 1 : 0);
            }, 0);
            return { tag: tag, count: count };
        })
    }
    else if (!counts.length) {
        counts = customersCopy.reduce((counts: EnabledTags[], customer: Customer) => {
            if (!customer.enabledTags) {
                nullCount++;
            }
            else {
                customer.enabledTags.forEach((tag: string) => {
                    let tagObj = counts.find(obj => obj.tag === tag);
                    if (tagObj) {
                        tagObj.count++;
                    } else {
                        counts.push({ tag: tag, count: 1 });
                    }
                });
            }
            return counts;
        }, []);
        counts.unshift({ tag: "(Blanks)", count: nullCount });
    }
    return counts;
}

const transformRegistrationStatus = (customersCopy: Customer[]) => {
    return customersCopy.reduce((status: RegistrationStatus[], customer: Customer) => {
        let statusObj = status.find(obj => obj.status == customer.registrationStatus);
        if (statusObj)
            statusObj.count++;
        else
            status.push({ status: customer.registrationStatus, count: 1, label: customer.registrationStatus === "Complete" ? "Ready" : "Checkout Off" })
        return status
    }, []);
}

export const filteredCustomers = (showDeactivatedUser: Boolean) => {
    let transformedData = mockCustomers.filter((customer: Customer) => {
        return mockCustomersListSettings.reduce((obj: object, setting: CustomerListSetting) => {
            const { id } = setting;
            Object.assign(obj, { [id]: customer[id] });
            return obj
        }, {});
    })

    if (showDeactivatedUser) {
        transformedData = transformedData.filter((elem: Customer) => !elem.active)
    }
    else {
        transformedData = transformedData.filter((elem: Customer) => elem.active)
    }
    return transformedData;
}

export const toggleDeactivatedUser = (showDeactivatedUser: boolean, customers: Customer[]) => {
    let new_customer: Customer[] = [];
    if (showDeactivatedUser)
        new_customer = customers.filter((elem: Customer) => !elem.active);
    else
        new_customer = customers.filter((elem: Customer) => elem.active)
    return new_customer;
}

export const getFilters = (customersCopy: Customer[], customers?: Customer[]) => {
    const checkoutStatus = transformRegistrationStatus(customersCopy);
    const salesRep = getTotalAvailableSalesResp(customersCopy);
    const tags = allEnabledTags(customersCopy, customers);
    return { registrationStatus: checkoutStatus, salesRepName: salesRep, enabledTags: tags }
}

export const filterCustomerData = (appliedFilters: any, filterState: any, customers: Customer[]) => {
    Object.keys(filterState).filter((key: string) => {
        const filter = filterState[key];
        if (key === "registrationStatus" && filter.value) {
            const status = filter.value === "Ready" ? "Complete" : "Incomplete";

            appliedFilters.current = [...customers.filter((cust: Customer) => cust[key] === status)]
        }
        if (key === "salesRepName" && Object.keys(filter.value).length) {

            const filteredBySalesRepName = Object.keys(filter.value).flatMap((salesRepName: string) => {
                return customers.filter((cust: Customer) => cust.salesRepName.toLowerCase() === salesRepName.toLowerCase())
            })

            if (appliedFilters.current.length) {
                appliedFilters.current = appliedFilters.current.filter((customer: Customer) => filteredBySalesRepName.includes(customer));
            }
            else {
                appliedFilters.current = [...filteredBySalesRepName]
            }
        }
        if (key === "enabledTags" && Object.keys(filter.value).length) {
            const filterByTags = Object.keys(filter.value).flatMap((tag: string) => {
                if (tag === "(Blanks)") {
                    return customers.filter((cust: Customer) => !cust.enabledTags || cust.enabledTags.length === 0 || cust.enabledTags === null);
                } else {
                    return customers.filter((cust: Customer) => cust.enabledTags?.includes(tag));
                }
            })
            if (appliedFilters.current.length) {
                appliedFilters.current = appliedFilters.current.filter((customer: Customer) => filterByTags.includes(customer))
            }
            else {
                appliedFilters.current = [...filterByTags];
            }
        }
    })
     return appliedFilters.current;
}
