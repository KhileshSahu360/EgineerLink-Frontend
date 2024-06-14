import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import { Button } from "../ui/button"
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem('v09userInfoId');
    localStorage.removeItem('v09userInfoName');
    document.cookie = 'token' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/signin');
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-mainColor">Logout <LogoutIcon fontSize=".6rem" className="ml-2 "/></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure to Logout?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel >Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-mainColor" onClick={logoutHandler}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default Logout ;