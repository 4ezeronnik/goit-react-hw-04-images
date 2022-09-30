const mapperPictures = (pictures) => {
    return pictures.map(
        ({ id, webformatURL: image, largeImageURL: largeImage, tags }) => ({
            id,
            image,
            largeImage,
            tags,
        })
    );
};

export default mapperPictures;