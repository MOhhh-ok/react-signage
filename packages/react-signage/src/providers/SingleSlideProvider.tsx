import { SingleSlideContext } from "../contexts";
import { SignageItem } from "../types";

type SingleSlideProviderProps = {
    item: SignageItem;
    index: number;
    children: React.ReactNode;
}

export function SingleSlideProvider(props: SingleSlideProviderProps) {
    const { item, index, children } = props;

    return <SingleSlideContext.Provider key={index} value={{ item, index }}>
        {children}
    </SingleSlideContext.Provider>
}