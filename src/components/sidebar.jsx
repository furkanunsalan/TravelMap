import './css/sidebar.css';
import { TabsNav } from './TabsNav.jsx';

export default function SideBar() {
    return (
        <div className="sidebar p-8 bg-white">
            <h4 className="text-center font-semibold font-sans">Furkan's Travel List</h4>
            <TabsNav />
        </div>
    );
}
