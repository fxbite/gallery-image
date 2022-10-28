export type RootStackParamList = {
    Form: undefined
    List: {link: string[]} | undefined
    Photo: undefined
    GeoList: undefined
}

export interface PreviewPhotoProps {
    imageUrlBase64: string
}

export interface GeoImage {
    imageUrl: string,
    latitude?: number,
    longitude?: number
}