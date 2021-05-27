const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = (files, extencionesValidas = ['PNG', 'JPG', 'JPEG', 'GIF'], carpeta='') =>{

    return new Promise((resolve, reject) =>{

        const {archivo} = files;  
        const nombreCortado = archivo.name.split('.');
        const extencion = nombreCortado[nombreCortado.length - 1];
       
       // Validar la extencion
       if (!extencionesValidas.includes(extencion.toUpperCase())) {
           return reject(`La extencion no es permitida. Debe ingresar alguna de tipo ${extencionesValidas}`)
        }      
    
    
        const nombreTemporal = uuidv4() + '.' + extencion;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta,  nombreTemporal);
      
        archivo.mv(uploadPath, (err) => {
          if (err) {
              reject(err)
          }
      
          resolve(nombreTemporal);
        }); 
    })
  

}





module.exports= {
    subirArchivo
}
