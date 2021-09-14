import { useAdminAuth } from "../customHooks";


const WithAdminAuth=(props)=>useAdminAuth() && props.children;

export default WithAdminAuth;