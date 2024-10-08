import { useRef, useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, getFile, uploadFile } from '../../../firebase.js';
import { Editor } from '@tinymce/tinymce-react';
import Swal from 'sweetalert2';
import "./createPost.css";


const CreatePost = () => {
    const [entry, setEntry] = useState({ title:"", content:"", picture:"", summary:"", category:["IA","PC","IT GENERAL","SEGURIDAD", "INTERNET"] })
    const [validations, setValidations] = useState({ title:false, summary:false });
    const [fileImg, setFileImg] = useState(null)


    const editorRef = useRef(null);
    const handleChange = () => {
        const data = editorRef.current.getContent();
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
            }
            else {
                pictureUrl = entry.picture;
            }
            entry.picture = pictureUrl;
            
            if(Object.values(validations).every(value => value === true)){
                sendData(entry)
                Swal.fire({
                    title: "Post Creado",
                    icon: "success"
                });
                entry.title = ""
                entry.content = ""
                entry.picture = ""
                entry.summary = ""
                setFileImg("")
                setValidations({ title:false, summary:false })
            }
            else{
                Swal.fire({
                    title: "Completa el formulario",
                    icon: "error"
                });
            }
        }
        catch (error) {
            // console.log(error.message)
            throw new error
        }
    };



    return (
        <div className='containerForm'>
			<form onSubmit={handleSubmit} className="formulario">
				<div>
                    <label>Titulo del Post</label>
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
                    <label>Resumen del Post</label>
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
                    <label>Foto del Post URL (recomendado HD)</label>
                    <input
                        type="text"
                        name='picture'
                        placeholder="URL de la Foto"
                        id="picture"
                        value={entry.picture}
                        onChange={handleInputChange}
                    />
				</div>
                <h3 id='o'>O</h3>
                <div>
                    <label>Foto del Post desde PC (recomendado HD)</label>
                    <input
                        type="file"
                        name='picture'
                        id="picture"
                        accept="image/png, image/jpeg"
                        onChange={(e) => setFileImg(e.target.files[0])}
                    />
				</div>
                
                <div>
                    <label>Categoria del Post</label>
                    <select value={entry.category} onChange={handleInputChange} name="category">
                        <option value="IA">IA</option>
                        <option value="PC">PC</option>
                        <option value="IT GENERAL">IT GENERAL</option>
                        <option value="SEGURIDAD">SEGURIDAD</option>
                        <option value="INTERNET">INTERNET</option>
                    </select>
                </div>
                
				<div>
                    <label>Contenido del Post</label>
                    <Editor
                        apiKey={import.meta.env.VITE_API_CREATE_POST}
                        onInit={(_evt, editor) => editorRef.current = editor}
                        init={{
                        height: 500,
                        menubar: false,
                        branding: false,
                        statusbar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'autosave'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic underline forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | image | wordcount',
                        }}
                        onChange={handleChange}
                    />
				</div>
                
				<button type="submit">Crear Post</button>
			</form>
		</div>
    )
}

export default CreatePost