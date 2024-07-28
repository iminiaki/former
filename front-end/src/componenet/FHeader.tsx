import {FLogo} from "./FLogo.tsx";
import {FButton} from "./FButton.tsx";
import {FTitle} from "./FTitle.tsx";
import {FHeaderTabContainer} from "./FHeaderTabContainer.tsx";
import {FHeaderTab} from "./FHeaderTab.tsx";

export const FHeader = () => {
    return (
        <header className={'w-full h-32 flex flex-col bg-white shadow-2xl p-4'}>
            <div className={'flex justify-between items-center'}>
                <div className={'left-side flex items-center justify-start gap-2'}>
                    <FLogo src={'./public/image/logo.png'} alt={''}/>
                    <FTitle value={'Untitled form...'}/>
                </div>
                <div className={'right-side flex items-center'}>
                    <FButton value={'Send'}/>
                </div>
            </div>
            <FHeaderTabContainer>
                <FHeaderTab isActive value={'Questions'}/>
                <FHeaderTab value={'Responses'}/>
            </FHeaderTabContainer>
        </header>
    )
}