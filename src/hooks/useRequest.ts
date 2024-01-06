import { useRouter } from "next/navigation";

export default function useRequest() {
    const router = useRouter();
    
    const postRequest = async ({
        group,
        type,
        number,
        filename,
        comment,
        status
      }: {
        group:number
        type:string
        number:number
        filename:string
        comment?:string
        status?:string
      }) => {
        const res = await fetch("/api/reserve", {
          method: "POST",
          body: JSON.stringify({
            group,
            type,
            number,
            filename,
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
    
      const getRequest = async () => {
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

    const putRequest = async ({id, newStatus}:{id: number, newStatus: string}) => {
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
      postRequest,
      getRequest,
      putRequest
    };
}