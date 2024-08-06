import '../styles/sidebar.css';
import { TabsNav } from './TabsNav.jsx';

export default function Sidebar() {
    return (
        <div className="sidebar p-8 bg-white hidden md:block">
            <h4 className="text-center font-semibold font-sans">Furkan's Travel List</h4>
            <TabsNav />
        </div>
    );
}
