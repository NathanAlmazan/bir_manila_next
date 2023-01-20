import { gql } from "@apollo/client";

export interface RevenueDistrict {
    number: number;
    name: string;
}

export interface BirOffice {
    id: string;
    name: string;
    address: string;
    email: string;
    district: RevenueDistrict | null;
    officers: ContactPerson[];
}

export interface ContactPerson {
    id: string;
    name: string;
    position: string;
    contacts: ContactInfo[];
}

export interface ContactInfo {
    id: string
    number: string;
    type: ContactType;
}

export type ContactType = "TELEPHONE" | "TELEFAX"

export const GET_ALL_RDO = gql`
    query FindAllDistricts {
        findAllDistricts {
            number
            name
        }
    }
`

export const GET_OFFICES_BY_RDO = gql`
    query FindBirOfficesByDistrict($district: Int) {
        findOfficesByDistrict(district: $district) {
            id
            name
            address
            email
            district {
                number
            }
            officers {
                name
                position
                contacts {
                    number
                    type
                }
            }
        }
    }
`

export const SEARCH_OFFICES = gql`
    query SearchBirOffices($office: String!) {
        searchBirOffices(office: $office) {
            id
            name
            address
            email
            district {
                number
            }
            officers {
                name
                position
                contacts {
                    number
                    type
                }
            }
        }
    }
`