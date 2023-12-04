import {atom} from "recoil";


interface UserType{
  isLoading: boolean
  userEmail: String | null
}
export const userState = atom<UserType>({
  key: 'userState',
  default: {
    isLoading: true,
    userEmail: null
  },
});
