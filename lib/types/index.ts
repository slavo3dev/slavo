export interface HeadProps  {
    title: string;
    description?: string;
    canonicalPath?: string;
}

export interface HeaderProps
{
    showForm: boolean;
    setShowForm: ( arg: any ) => void
}

export interface CurrentCategoryProps {
    setCurrentCategory: (arg: string) => void
}

export interface QuestionListProps {
    [ x: string ]: any;
    questions: any[]
    setQuestions: (arg: any) => void
}

export interface QuestionProps { 
    question: {
        status: string,
        id: number,
        title: string,
        description: string, 
        category: string,
        email: string
        answer: string
    };

    setQuestions: (arg: any) => void 
}

export interface NewResourceFromProps {
    setSources: ( arg: any ) => void; 
    setShowForm: any
}

export interface LoaderProp
{
    title: string
}

export interface TitleProps
{
    title: string
}
export type videoCardTypes= {
	imgUrl:string,
    id:object,
	title:string,
	name:string,
    videoURL:string;
	
}
export type getVideosType = (channel:string)=>{
    imgUrl:string,
    title:string,
    channelName:string,
    id:string
}[];

export type VideoType={
    imgUrl:string,
    title:string,
    channelName:string,
    id:string
}

export type videoContextType={
videoLine:string;
setVideoLine:(videoLine:string)=>void
}