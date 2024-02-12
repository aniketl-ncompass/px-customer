export interface Customer {
    id: number;
    buyerName: string;
    active: boolean;
    country: string;
    state: string;
    notesCount: number;
    registrationStatus: string;
    salesRepId: number;
    salesRepName: string;
    enabledTags: string[] | null;
    totalActiveUsers: number;
    createDate: string;
    updateDate: string;
    lastActiveDate: string | null;
    [key: string]: number | string | boolean | string[] | null;
}

export interface CustomerListSetting {
    id: string;
    label: string;
}

export interface AvailableSalesRep {
    salesRepId: number;
    salesRepName: string;
    count: number;
}

export interface EnabledTags {
    tag: string;
    count: number;
}

export interface RegistrationStatus {
    status: string;
    count: number;
    label: string;
}
interface RegistrationStatusFilter {
    label: string,
    defaultValue: string,
    tempValue: string,
    value: string
}
interface SalesRepNameFilter {
    label: string,
    defaultValue: string,
    tempValue: object,
    value: object
}
interface EnabledTagsFilter {
    label: string,
    defaultValue: string,
    tempValue: object,
    value: object
}
interface CreateDateFilter {
    label: string,
    defaultValue: string,
    tempValue: string,
    value: string
}
interface UpdateDateFilter {
    label: string,
    defaultValue: string,
    tempValue: string,
    value: string
}

export interface AppliedFilterType {
    registrationStatus: RegistrationStatusFilter,
    salesRepName: SalesRepNameFilter
    enabledTags: EnabledTagsFilter,
    createDate: CreateDateFilter,
    updateDate: UpdateDateFilter,
    [key: string]: object
}
export interface TransformedFiltersType {
    registrationStatus: RegistrationStatus[];
    salesRepName: AvailableSalesRep[];
    enabledTags: EnabledTags[];
    [key: string]: object
}