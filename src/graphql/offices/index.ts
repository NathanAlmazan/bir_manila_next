import { gql } from "@apollo/client";

export interface RevenueDistrict {
    number: number;
    name: string;
}

export const GET_ALL_RDO = gql`
    query FindAllDistricts {
        findAllDistricts {
            number
            name
        }
    }
`