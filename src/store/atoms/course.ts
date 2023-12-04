import {atom} from "recoil";


type Courses = {
    description:String | null
    title:String | null
    image:String | null
    _id:String | null
    price:String | null
}
interface CourseState{
    course:Courses
    isLoading:boolean
}

export const courseState = atom<CourseState>({
  key: 'courseState',
  default: {
    isLoading: true,
    course: {
        _id:null,
        title:null,
        price:null,
        image:null,
        description:null
    }
  },
});
