import { Dialog, DialogTitle ,DialogContent, DialogActions } from "@mui/material";
import { Separator } from "@/components/ui/Separator";
import useLaserCutRequest from "@/hooks/useLaserCutRequest";
import useThreeDPRequest from "@/hooks/useThreeDPRequest";
import { useRouter } from "next/navigation";

export type FinishDialogProps = {
    id: number
    open: boolean;
    groupName: number;
    type: string;
    onClose: () => void;
};

export default function FinishedDialog({ id, open, groupName, onClose, type }: FinishDialogProps) {
    const { putLaserCutRequestStatus } = useLaserCutRequest();
    const { putThreeDPRequestStatus } = useThreeDPRequest()
    const Button = require("@mui/material/Button").default;
    const router = useRouter();
    const handleStatusChange = async (id: number, newStatus: string) => {
        if (type === "laser"){
            try{
                await putLaserCutRequestStatus({
                    id,
                    newStatus
                })
                
            }catch(e){
                console.error(e);
            }
        }
        else{
            try{
                await putThreeDPRequestStatus({
                    id,
                    newStatus
                })
                
            }catch(e){
                console.error(e);
            }
        }
        
        // router.refresh();
    }
    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>確定{type === "laser" ? "雷切" : "3D列印" }完畢?</DialogTitle>
                <Separator />
                <DialogContent className="w-96 h-96">
                    <div className="m-1 w-full flex flex-col items-top justify-center">
                        <p className="text-lg font-bold">記得請{groupName}的選手拿取雷切成品</p>
                    </div>  
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>取消</Button>
                    <Button onClick={()=>{
                        handleStatusChange(id, "完");
                        onClose();
                    }}>確定</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}