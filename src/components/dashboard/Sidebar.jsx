import { FiFile, FiFilePlus, FiUsers, FiTrash, FiSettings, FiLogOut } from 'react-icons/fi';

const Sidebar = ({ selectedTab, onChangeTab, onCreateDocument, onLogout }) => {
    const menuItems = [
        { label: "Mis Documentos", icon: <FiFile />, key: "mine" },
        { label: "Compartidos", icon: <FiUsers />, key: "shared" },
        { label: "Papelera", icon: <FiTrash />, key: "trash", disabled: true },
        { label: "Configuración", icon: <FiSettings />, key: "config" }
    ];

    return (
        <aside className="w-16 hover:w-64 bg-gray-800 h-screen p-2 fixed left-0 top-0 transition-all duration-300 group">
            <nav className="mt-16">
                {menuItems.map((item) => (
                    <button
                        key={item.key}
                        onClick={() => {
                            if (item.disabled) return;
                            onChangeTab(item.key);
                        }}
                        className={`
                            flex items-center h-12 gap-3 p-3 mb-2 rounded-lg 
                            ${selectedTab === item.key 
                                ? 'bg-blue-600 text-white' 
                                : 'text-gray-300 hover:bg-gray-700'}
                        `}
                    >
                        {item.icon}
                        <span className="hidden group-hover:block truncate">
                            {item.label}
                        </span>
                    </button>
                ))}

                <button 
                    onClick={onCreateDocument}
                    className="w-full mb-6 p-3 bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-3"
                >
                    <FiFilePlus className="min-w-max" />
                    <span className="hidden group-hover:block truncate">
                        Nuevo Documento
                    </span>
                </button>
            
                {/* Botón de cerrar sesión */}
                <button onClick={onLogout} className="w-full flex items-center gap-3 p-3 text-gray-300 hover:bg-gray-700 rounded-lg">
                    <FiLogOut />
                    <span className="hidden group-hover:block truncate">Cerrar Sesión</span>
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;