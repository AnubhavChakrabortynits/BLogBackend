const changeGoogleDriveLink=(link) => {

    const imageID=link.split('/')[5];
    
    let imageString=`https://drive.google.com/uc?export=view&id=${imageID}`;
    console.log(imageString);
    return imageString;
    
}

changeGoogleDriveLink('https://drive.google.com/file/d/1_HE-A6OhmY9-0eTsWtXJgc2RBi93gLUo/view')
module.exports=changeGoogleDriveLink;