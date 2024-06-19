import './css/sidebar.css';
import {TabsNav} from './TabsNav.jsx'

export default function SideBar() {
        return (
            <div>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <h4 className="mainhe text-center font-semibold font-sans">Furkan's Travel List</h4>
                    <TabsNav />
            </div>
        );
}
