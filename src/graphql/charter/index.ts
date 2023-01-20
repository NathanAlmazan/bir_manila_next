import { gql } from '@apollo/client';

export interface CharterCategories {
    id: string;
    name: string;
}

export interface CitizenCharter {
    uuid: string;
    chapter: number;
    title: string;
    description: string;
    location: string;
    applicants: string;
    period: string | null;
    fee: string | null;
    duration: string;
    requirementClasses: RequirementClass[];
    processList: CharterProcess[];
}

export interface RequirementClass {
    id: string;
    name: string;
    required: boolean
    requirements: [CharterRequirements]
}

export type Redirects = "BANK" | "OFFICES" | "ZONAL" | "EREG"

export interface CharterRequirements {
    id: string;
    name: string;
    notes: string | null;
    required: boolean
    redirect: Redirects | null;
}

export interface CharterProcess {
    id: string;
    step: number;
    description: string;
    type: string;
    duration: string | null;
    fee: string | null;
    notes: string | null;
    redirect: Redirects | null;
}

export const GET_ALL_CATEGORIES = gql`
    query FindAllCategory {
        findAllCategories {
            id
            name
        }
    }
`

export const GET_CHARTER_BY_CATEGORY = gql`
    query FindChartersByCategory($category: Int!) {
        findChartersByCategory(category: $category) {
            uuid
            chapter
            title
            description
            location
            applicants
            fee
            duration
        }
    }
`

export const GET_ALL_CHARTER = gql`
    query FindAllCharter {
        findAllCharter {
            uuid
        }
    }
`

export const GET_CHARTER_BY_UUID = gql`
    query FindCharterById($uuid: String!) {
        findCharterById(uuid: $uuid) {
            chapter
            title
            description
            location
            applicants
            period
            fee
            duration
            requirementClasses {
                id
                name
                required
                requirements {
                    name
                    notes
                    required
                    redirect
                }
            }
            processList {
                id
                step
                description
                type
                duration
                fee
                notes
                redirect
            }
        }
    }
`

export const SEARCH_CHARTER = gql`
    query SearchCharter($search: String!) {
        searchCharter(search: $search) {
            uuid
            chapter
            title
            description
            location
            applicants
            fee
            duration
        }
    }
`