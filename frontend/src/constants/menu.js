const MENU_ITEMS = [
    {
        key: 'companies.index',
        label: 'Empresas',
        url: '/panel/companies',
        icon: 'mdi mdi-office-building-outline',
    },

    {
        key: 'technicalConsultants.index',
        label: 'Consultores Técnicos',
        url: '/technical-consultants/list',
        icon: 'mdi mdi-account-tie',
    },

    {
        key: 'vehiclesCrud',
        label: 'Cadastro de Veículos',
        isTitle: false,
        icon: 'mdi mdi-car',
        children: [
            {
                key: 'vehicleBrands.index',
                label: 'Marcas',
                url: '/vehicle-brands/list',
                icon: 'mdi mdi-library',
                parentKey: 'vehiclesCrud'
            },
            {
                key: 'vehicleModels.index',
                label: 'Modelos',
                url: '/vehicle-models/list',
                icon: 'mdi mdi-car-info',
                parentKey: 'vehiclesCrud'
            },
            {
                key: 'vehicles.index',
                label: 'Veículos',
                url: '/vehicles/list',
                icon: 'mdi mdi-car',
                parentKey: 'vehiclesCrud'
            },
        ],
    },

    {
        key: 'clientVehicles.index',
        label: 'Veículos do Clientes',
        url: '/client-vehicles/list',
        icon: 'mdi mdi-car',
    },

    {
        key: 'serviceSchedules.index',
        label: 'Horários de Serviço',
        url: '/service-schedules/list',
        icon: 'mdi mdi-clipboard-clock',
    },
    {
        key: 'clients.index',
        label: 'Clientes',
        url: '/clients/list',
        icon: 'mdi mdi-briefcase-account',
    },

    {
        key: 'tireBrands.index',
        label: 'Marcas de Pneus',
        url: '/tire-brands/list',
        icon: 'mdi mdi-tire',
    },

    {
        key: 'claimServices.index',
        label: 'Serviços de Reclamação',
        url: '/claim-services/list',
        icon: 'mdi mdi-face-agent',
    },

    {
        key: 'products.index',
        label: 'Produtos',
        url: '/products/list',
        icon: 'mdi mdi-animation',
    },

    {
        key: 'services.index',
        label: 'Serviços',
        url: '/services/list',
        icon: 'mdi mdi-toolbox-outline',
    },


];

export default MENU_ITEMS;
