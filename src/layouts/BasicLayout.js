import BasicMenu from "../components/menus/BasicMenu";
import CartComponent from "../components/cart/CartComponent";

const BasicLayout = ({children}) => {
    return (
        <>
            <BasicMenu/>
            <div
                className="bg-white my-5 w-full flex flex-col space-y-1 md:flex-row md:space-x-1 md:space-y-0">
                <main
                    className="bg-sky-300 md:w-4/5 lg:w-3/4 px-5 py-5"> {/* 상단 여백 py-40 변경 flex 제거 */}
                    {children}
                </main>
                <aside
                    className="bg-green-300 md:w-1/5 lg:w-1/4 px-5 flex py-5"> {/* 상단 여백 py-40 제거 flex 제거 */}
                    <CartComponent/>
                </aside>
            </div>
        </>
    )
}

export default BasicLayout;