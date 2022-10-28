export type RootStackParamList = {
    Form: undefined
    List: {link: string[]} | undefined
    Photo: undefined
    GeoList: {locationInfo: {latitude: number, longitude: number}} | undefined
}

export interface PreviewPhotoProps {
    imageUrlBase64: string
}

export interface GeoImage {
    imageUrl: string,
    latitude?: number,
    longitude?: number
}

export interface LocationInfo {
    latitude: number
    longitude: number
    marker: {
        latitude: number
        longitude: number
    }
}