import { useRouter } from "next/navigation";

export default function useThreeDPRequest() {
    const router = useRouter();

    const postLaserCutRequest = async ({
        group,
        machine,
        filename,
        material,
        comment,
        status
      }: {
        group:number
        machine:number
        filename:string
        material:number[]
        comment?:string
        status?:string
      }) => {
        // console.log(machine,material)
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
    
      const getLaserCutRequest = async () => {
      const res = await fetch("/api/reserve", {
        method: "GET",
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error);
      }
      router.refresh();
      return res.json();
    }

    const putLaserCutRequest = async ({id, newStatus}:{id: number, newStatus: string}) => {
      // console.log("putteded")
      const res = await fetch("/api/reserve", {
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