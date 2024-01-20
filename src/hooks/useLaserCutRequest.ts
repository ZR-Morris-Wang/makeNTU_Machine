import { useRouter } from "next/navigation";
import type { Account } from "@/context/Account";

export default function useLaserCutRequest() {
    const router = useRouter();
    
    //POST
    const postLaserCutRequest = async ({
        group,
        machine,
        filename,
        material,
        comment,
        status
      }: {
        group:string
        machine:number
        filename:string
        material:number[]
        comment?:string
        status?:string
      }) => {
        // console.log(group, material)
        const res = await fetch("/api/reserveforLaser", {
          method: "POST",
          body: JSON.stringify({
            group,
            machine,
            filename,
            material,
            comment,
            status
          }),
        });
        if (!res.ok) {
          const body = await res.json();
          throw new Error(body.error);
        }
        // router.refresh() is a Next.js function that refreshes the page without
        // reloading the page. This is useful for when we want to update the UI
        // from server components.
        router.refresh();
      };
    
    //GET
    const getLaserCutRequest = async () => {
      console.log("hehe")
      const res = await fetch("/api/reserveforLaser", {
        method: "GET",
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error);
      }
      router.refresh();
      return res.json();
    }
    
    //PUT
    const putLaserCutRequest = async ({id, newStatus}:{id: number, newStatus: string}) => {
      const res = await fetch("/api/reserveforLaser", {
        method: "PUT",
        body: JSON.stringify({
          id,
          newStatus
        }),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error);
      }
      router.refresh();
    }

    return {
      postLaserCutRequest,
      getLaserCutRequest,
      putLaserCutRequest,
    };
}