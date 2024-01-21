import { useRouter } from "next/navigation";

export default function useThreeDPRequest() {
    const router = useRouter();

    //POST
    const postThreeDPRequest = async ({
        group,
        machine,
        filename,
        loadBearing,
        material,
        comment,
        status
      }: {
        group:string
        machine:number
        filename:string
        loadBearing: boolean,
        material:number[]
        comment?:string
        status?:string
      }) => {
        const res = await fetch("/api/reserveforThreeDP", {
          method: "POST",
          body: JSON.stringify({
            group,
            machine,
            filename,
            loadBearing,
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
    const getThreeDPRequest = async () => {
      const res = await fetch("/api/reserveforThreeDP", {
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
    const putThreeDPRequest = async ({id, newStatus}:{id: number, newStatus: string}) => {
      const res = await fetch("/api/reserveforThreeDP", {
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
      postThreeDPRequest,
      getThreeDPRequest,
      putThreeDPRequest,
    };
}