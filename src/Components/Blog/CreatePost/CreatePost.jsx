import Editor from 'ckeditor5-custom-build';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, getFile, uploadFile } from '../../../firebase.js';
import "./createPost.css";



const CreatePost = () => {
    const [entry, setEntry] = useState({ title:"", content:"", picture:"", summary:"" })
    const [validations, setValidations] = useState({ title:false, summary:false });
    const [fileImg, setFileImg] = useState(null)


    const handleChange = (event, editor) => {
        const data = editor.getData();
        setEntry({ ...entry, content: data });
    };


    const handleInputChange = event =>{
        const value = event.target.value;
        const name = event.target.name;
        
        setEntry({...entry, [name]:value})
        setValidations({...validations, [name]: value.trim() !== ""});
    }


    const sendData = async(entry) =>{
        const postRef = collection(db, "posts");
        await addDoc(postRef, entry)
    }

    const handleSubmit = async(e) => {
        try {
            e.preventDefault();
            
            let pictureUrl = "";
            if (fileImg) {
                const fileUploadTask = await uploadFile(fileImg);
                pictureUrl = await getFile(fileUploadTask.ref.fullPath);
            } else {
                pictureUrl = entry.picture;
            }
            entry.picture = pictureUrl;
            
            if(Object.values(validations).every(value => value === true)){
                sendData(entry)
                alert("Post Creado")
                entry.title = ""
                entry.content = ""
                entry.picture = ""
                entry.summary = ""
                setFileImg("")
                setValidations({ title:false, summary:false })
            }
            else{
                alert("Completa el formulario")
            }
        }
        catch (error) {
            console.log(error.message)
            throw new error
        }
    };



    return (
        <div className='containerForm'>
			<form onSubmit={handleSubmit} className="formulario">
				<div>
                    <label htmlFor="title">Titulo del Post</label>
                    <input
                        type="text"
                        name='title'
                        placeholder="Titulo"
                        id="titulo"
                        value={entry.title}
                        onChange={handleInputChange}
                    />
				</div>
                
                <div>
                    <label htmlFor="summary">Resumen del Post</label>
                    <input
                        type="text"
                        name='summary'
                        placeholder="Resumen"
                        id="summary"
                        value={entry.summary}
                        onChange={handleInputChange}
                    />
				</div>
                
                <div>
                    <label htmlFor="picture">Foto del Post URL (recomendado HD)</label>
                    <input
                        type="text"
                        name='picture'
                        placeholder="URL de la Foto"
                        id="picture"
                        value={entry.picture}
                        onChange={handleInputChange}
                    />
				</div>
                <p>o</p>
                <div>
                    <label htmlFor="picture">Foto del Post desde PC (recomendado HD)</label>
                    <input
                        type="file"
                        name='picture'
                        id="picture"
                        accept="image/png, image/jpeg"
                        onChange={(e) => setFileImg(e.target.files[0])}
                    />
				</div>
                
				<div>
                    <label htmlFor="content">Contenido del Post</label>
                    <CKEditor
                        editor={Editor}
                        data={entry.content}
                        onChange={handleChange}
                    />
				</div>
                
				<button type="submit">Crear Post</button>
			</form>
		</div>
    )
}

export default CreatePost