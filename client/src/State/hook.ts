import { useDispatch,useSelector } from "react-redux";
import type { AppDispatch,RootState } from "./Store";


// normal useDispatch && useSlector in the end is same as  in js 
export const useAppDispatch=useDispatch.withTypes<AppDispatch>();
export const useAppSelector=useSelector.withTypes<RootState>();