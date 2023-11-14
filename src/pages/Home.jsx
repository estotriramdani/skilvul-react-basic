import { useContext, useState } from 'react';
import AppContext from '../contexts/AppContext';
import TodoCard from '../components/TodoCard';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CloudinaryUploadWidget from '../components/CloudinaryUploadWidget';

const HomePage = () => {
  const ctx = useContext(AppContext);
  const [todo, setTodo] = useState('');

  const [fileUrl, setFileUrl] = useState('');
  
  const [publicId, setPublicId] = useState();
  // Replace with your own cloud name
  const [cloudName] = useState(import.meta.env.VITE_CLOUDINARY_NAME);
  // Replace with your own upload preset
  const [uploadPreset] = useState(import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    // cropping: true, //add a cropping step
    // showAdvancedOptions: true,  //add advanced options (public_id and tag)
    // sources: [ "local", "url"], // restrict the upload sources to URL and local files
    // multiple: false,  //restrict upload to a single file
    // folder: "user_images", //upload files to the specified folder
    // tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
    // clientAllowedFormats: ["images"], //restrict uploading to image files only
    // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple theme
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(fileUrl);
    await ctx.handleAddTodo(todo);
    setTodo('');
  };

  return (
    <div className="pt-20 px-6 text-white mx-auto flex flex-col items-center">
      <div className="max-w-md">
        <form onSubmit={handleSubmit} className="mb-4">
          <CustomInput value={todo} onChange={(event) => setTodo(event.target.value)} />
          <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} setFileUrl={setFileUrl} />
          <CustomButton type="submit">Add Todo</CustomButton>
        </form>
        <div className="flex gap-3 flex-col-reverse">
          {ctx.todos.map((todo) => (
            <TodoCard key={todo.id} todo={todo.todo} createdAt={todo.createdAt} id={todo.id} />
          ))}
          {ctx.isLoading && (
            <div className="w-full h-20 animate-pulse bg-gray-400 flex-shrink-0 rounded-lg"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
