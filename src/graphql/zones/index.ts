import { gql } from "@apollo/client";
import { RevenueDistrict } from "../offices";

export interface Zone {
    id: string;
    number: number;
    barangay: string;
    boundaries: string;
    district: RevenueDistrict;
    values: ZonalValue[]
}

export interface ZonalValue {
    id: string;
    barangay: string;
    streetSubdivision: string;
    vicinity: string;
    pricePerSqm: number;
    zoneNumber: number;
    classification: ZonalClassification
}

export interface ZonalClassification {
    code: string;
    name: string;
}

export const GET_VALUES_BY_DISTRICT = gql`
    query FindZonesByDistrict($district: Int!) {
        findZonesByDistrict(district: $district) {
            number
            values {
                id
                barangay
                streetSubdivision
                vicinity
                pricePerSqm
                zoneNumber
                classification {
                    code
                    name
                }
            }
        }
    }
`

export const GET_VALUES_BY_ADDRESS = gql`
    query FindZonalValueByAddress($address: String!) {
        findZonalValueByAddress(address: $address) {
            id
            barangay
            streetSubdivision
            vicinity
            pricePerSqm
            zoneNumber
            classification {
                code
                name
            }
        }
    }
`