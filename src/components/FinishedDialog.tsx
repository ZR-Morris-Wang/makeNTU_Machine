import { Dialog, DialogTitle ,DialogContent, DialogActions } from "@mui/material";
// import Button from "@mui/material";
import { Separator } from "@/components/ui/Separator";
import useLaserCutRequest from "@/hooks/useLaserCutRequest";
import { useRouter } from "next/navigation";

export type FinishDialogProps = {
    id: number
    open: boolean;
    groupName: number;
    onClose: () => void;
};

export default function FinishedDialog({ id, open, groupName, onClose }: FinishDialogProps) {
    const {putLaserCutRequestStatus, putLaserCutRequestMachine} = useLaserCutRequest();
    const Button = require("@mui/material/Button").default;
    const router = useRouter();
    const handleStatusChange = async (id: number, newStatus: string) => {
        try{
            // alert("status")
            console.log("status")
            await putLaserCutRequestStatus({
                id,
                newStatus
            })
            
        }catch(e){
            console.error(e);
        }
        // router.refresh();
    }
    const handleMachineChange = async(id: number, newMachine: number) => {
        try{
            // alert("machine")
            console.log("machine")
            await putLaserCutRequestMachine({
                id,
                newMachine
            })
        }catch(e){
            console.error(e);
        }
        // router.refresh();
    }
    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>確定雷切完畢?</DialogTitle>
                <DialogContent className="w-96 h-96">
                    <div className="m-1 w-full flex flex-col items-top justify-center">
                        <p className="text-lg font-bold">記得請{groupName}的選手拿取雷切成品</p>
                    </div>  
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>取消</Button>
                    <Button onClick={()=>{
                        handleMachineChange(id,3);
                        handleStatusChange(id, "完");
                        onClose();
                    }}>確定</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}