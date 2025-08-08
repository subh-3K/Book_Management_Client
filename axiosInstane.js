import axios from 'axios';
export const bookbaseUrl= axios.create({
    baseURL:"http://localhost:8000/book"
})