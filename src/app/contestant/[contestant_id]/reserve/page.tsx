"use client"
import React, { useState, useRef, useContext } from "react";
import InputArea from "@/components/ui/InputArea";
import { useRouter, usePathname } from "next/navigation";
import { AccountContext } from "@/context/Account";
import { RequestContext } from "@/context/Request";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function reserve() {
    const { user } = useContext(AccountContext);
    const { sendRequest } = useContext(RequestContext);
    const fileRef = useRef<HTMLInputElement>(null);
    const noteRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter();
    const pathname = usePathname();
    const [type, setType] = useState("");
    const [filename, setFilename] = useState("");
    const [comment, setComment] = useState("");
    const [falseTitle, setFalseTitle] = useState(false);
    const [tooLong, setTooLong] = useState(false);
    const [NoteTooLong, setNoteTooLong] = useState(false);
    const [unselected, setUnselected] = useState(false);
    const [boardList, setBoardList] = useState(["3mm密集板","5mm密集板","3mm壓克力","5mm壓克力"]);
    // if(user?.permission!=='admin' && user?.permission!=='contestant'){
    //     if(!tooLong) {
    //         alert("Please login first!");
    //         setTooLong(true);
    //     }
    //     router.push('/');
    // }

    const handleSubmit = async () => {
        if(type === "") {
            setUnselected(true);
            return;
        } else {
            setUnselected(false);
        } if(!filename) {
            setFalseTitle(true);
            return;
        } else {
            setFalseTitle(false);
        } if(filename.length > 15) {
            setTooLong(true);
            return;
        } else {
            setTooLong(false);
        } if(comment.length > 60) {
            setNoteTooLong(true);
            return;
        }
        const pathTemp = pathname.split("/");
        const group = pathTemp[2];
        const request = { group, type, filename, comment };
        console.log(request);
        
        try {
            sendRequest(request);
        } catch (error) {
            alert("Sorry, something rong happened. Please try again later.");
            console.log(error);
            return;
        }
        router.push(`/contestant/${group}`);
    }

    return (
        <div className="m-2 p-3 text-lg flex flex-col items-center justify-center justify-between">
            
            <div className="m-3 mb-0.5 w-2/6 flex items-center gap-2">
                <p className="font-bold w-1/4 text-right">隊伍編號：</p>
                <InputArea
                    editable={false}
                    value={"test"}
                    />
            </div>
            
            <div className="flex items-end w-2/6 h-5" />
            <div className="m-3 mb-0.5 w-2/6 flex items-center gap-2">
                <p className="font-bold flex-end w-1/4 text-right">機台類型：</p>
                <select 
                    className="p-1 h-8 border-black border-2 text-gray-800 rounded-lg bg-white focus:outline-none"
                    value={type}
                    onChange={(e)=>setType(e.target.value)}
                    defaultValue="">
                    <option value="">--Select--</option>
                    <option value="3DP">3D列印機</option>
                    <option value="LCM">雷射切割機</option>
                </select>
            </div>
            <div className="flex items-end w-2/6 h-5">
                {unselected && <p className="ml-20 w-3/4  pl-5 text-sm text-red-500 ">請選擇借用機台類型</p>}
            </div>
            <DragDropContext onDragEnd={(e)=>{console.log(e)}}>
                <Droppable droppableId="drop-id">
                    {/* // droppableId: 該 Droppable 的唯一識別ID */}

                    {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {/*
                        provided.innerRef
                        套件的機制所需, 直接去取用 dom 的 ref, 就是套用的例行公事
                        */}

                        {boardList.map((item, index) => (
                        // 以 map 方式渲染每個拖曳卡片 (Draggable)
                                    
                        
                        <Draggable draggableId={item} index={index} >
                            {/* // draggableId: 該卡片的唯一識別ID */}
                            {(provided, snapshot) => (
                            /* 
                                ...provided.droppableProps
                                ...provided.draggableProps
                                ...provided.dragHandleProps 
                                單純展開其他必要的 props 
                            */
                            
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                
                                {/* 實際上的卡片內容 */}
                                {item}
                                {/* 實際上的卡片內容 */}

                            </div>
                            )}
                        </Draggable>
                        ))}
                    </div>
                    )}
                </Droppable>
                </DragDropContext>
            <div className="m-3 mb-0.5 w-2/6 flex items-center gap-2">
                <p className="font-bold w-1/4 text-right">檔案名稱：</p>
                <InputArea
                    ref={fileRef}
                    placeHolder={"file name"}
                    editable={true}
                    value={filename}
                    onChange={(e) => setFilename(e)}
                />
            </div>
            <div className="flex items-end w-2/6 h-5">
                {falseTitle && <p className="ml-20 w-3/4 pl-5 text-sm text-red-500">請輸入檔案名稱</p>}
                {tooLong && <p className="ml-20 w-3/4 pl-5 text-sm text-red-500">檔案名稱不可超過15字</p>}
            </div>
            <div className="m-3 mb-0.5 w-2/6 flex gap-2">
                <p className="font-bold w-1/4 text-right">備註：</p>
                <textarea
                    ref={noteRef}
                    className="resize-none p-1 border-2 text-gray-800 border-black rounded-lg focus:border-gray-600 focus:outline-none"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </div>
            <div className="flex items-end w-2/6 h-5">
                {NoteTooLong && <p className="ml-20 w-5/6 pl-5 text-sm text-red-500">備註不可超過60字</p>}
            </div>
            <div className="m-2 flex gap-2">
                <button
                    className="m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                    onClick={() => router.back()}
                >取消</button>
                <button
                    className="m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                    onClick={handleSubmit}>登記</button>
            </div>
        </div>
    )
}