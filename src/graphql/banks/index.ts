import { gql } from "@apollo/client"

export interface AccreditedBank {
    id: string;
    district: unknown
    code: string;
    branch: string;
    details: BankDetails;
    fullAddress: string;
}

export interface BankDetails {
    shortName: string;
    fullName: string;
    logo: string;
}

export const GET_BANKS_BY_RDO = gql`
    query BanksByDistrict($district: Int!) {
        findBanksByDistrict(district: $district) {
            id
            code
            branch
            fullAddress
            details {
                fullName
                logo
            }
        }
    }
`

export const SEARCH_BANKS = gql`
    query BankByAddress($address: String!) {
        findBanksByAddress(address: $address) {
            id
            code
            branch
            fullAddress
            details {
                fullName
                logo
            }
        }
    }
`