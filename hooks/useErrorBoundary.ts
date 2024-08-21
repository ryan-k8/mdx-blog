import { useState } from "react";
import { useCtx } from "./useContext";
import { ErrorBoundaryContext, IErrorBoundary } from "@/context/ErrorBoundaryContext";


type HookState = {
    hasError:false,
    error:null,
} | {
    hasError:true,
    error:any,
};

const useErrorBoundary= () => {
 const {resetErrorBoundary} = useCtx<IErrorBoundary>(ErrorBoundaryContext,"Error Boundary");
 const [state,setState] = useState<HookState>({hasError:false,error:null});


 const resetBoundary = () => {
    resetErrorBoundary();
    setState({hasError:false,error:null});

 };

 const showBoundary= (error:any) => {
    setState({hasError:true,error:error});
 };



 if (state.hasError) throw state.error;

 return {resetBoundary,showBoundary};
};

export default useErrorBoundary;