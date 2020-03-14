export const ApiBaseUrl = "";

export const Module = "babuvi";

export const MessageType = {
    Default: 'default',
    Info: 'info',
    Success: 'success',
    Wait: 'wait',
    Error: 'error',
    Warning: 'warning',
};

export const paging = {
    perPage: 15
};

export const ShiftStatus = {
    STATUS_APPROVED: 1,
    STATUS_WAITING_APPROVE: 2,
    STATUS_EDIT_REQUESTED: 3,
    STATUS_DELETE_REQUESTED: 4,
};

export const ReceiptStatus = {
    CHOXACNHAN: 1,
    XACNHAN: 2,
    HUY: 3
}

export const PageSize = 20;

export const ApiApplication = {
    lstUserItem: {
        controller: ApiBaseUrl + "user/",
        lstUser: 'getListUserCustomer/',
        page: 'page',
        perPage: 'perPage',
        common: ApiBaseUrl + 'control/',
        actionAccess: 'controlInForm?',
        actionParam1: 'usercode',
        actionParam2: 'path'
    },
    common: {
        menuUser: ApiBaseUrl + 'control/menuUserCode/15682'
    },
    login:  ApiBaseUrl + 'user/login',
    logout: ApiBaseUrl + '',
    infoUser: ApiBaseUrl + 'user/getUserId/',
    walletByUserId: ApiBaseUrl + 'wallet/getWalletByUserId/',
    page: 'page',
    perPage: 'perPage',
    userId: 'userId',
    lServiceId: 'lServiceId',
    lCartId: 'lCartId',
    lCartServiceId: 'lCartServiceId',
    lCartItemId: 'lCartItemId',
    deliveryAddressId: 'deliveryAddressId',
    receiptTopup: {
        controller: ApiBaseUrl + 'Receipt/lsReceiptTopup/',
        page: 'page',
        perPage: 'perPage',
        destroy: ApiBaseUrl + 'wallet/destroyTopup/'
    },
    ODER_DETAIL: {
        get: ApiBaseUrl + "Order/getDataOrderFull/",
        chat: ApiBaseUrl + 'Order/addNewChat'
    },
    shipManager: {
        controller: ApiBaseUrl + 'order/',
        allOrder: 'allorder/',
    },
    cart: {
        controller: ApiBaseUrl + 'cart/',
        // lstAllServicesOption: 'getListOptionServiceOrder/', //api/cart/getListOptionServiceOrder/:  isOption = 2
        lstAllServicesOption: 'getLsServiceOrder/', // isOption = All
        lstCart: 'getListCart/', // api/cart/getListCart/?userId=1&perPage=5&page=1
        addFeeServices: 'CalFeeInCart', //CalFeeInCart/?lServiceId=1&lCartId=19
        delPriceServices: 'deleteCartServiceById', //api/Cart/deleteCartServiceById/11
        deleteShopItem: 'deleteShopItem/', // api/Cart/deleteShopItem/11
        deleteShop: 'deleteShop/', //api/Cart/deleteShop/11

        // cart 2
        // api/Cart/getListDeliveryAddressByUserId/?userId=1
        getListDeliveryAddressByUserId: 'getListDeliveryAddressByUserId', // Hàm load danh sách địa chỉ nhận hàng
        //api/Cart/addDeliveryAddress/ 
        addDeliveryAddress: 'addDeliveryAddress/', // Hàm thêm địa chỉ nhận hàng
        // api/cart/deactiveDeliveryAddressById/1
        deactiveDeliveryAddressById: 'deactiveDeliveryAddressById', // Hàm xóa địa chỉ nhận hàng
        // api/cart/DepositListOrder/
        DepositListOrder: 'DepositListOrder/', // Hàm dặt cọc
    },
    // Use for Merchandise Component
    merchandise: {
        controller: ApiBaseUrl + 'merchandise',
        addMerchandise: 'addmerchandise/',
        getMerchandiseViewModel: 'getmerchandiseviewmodel/',
        getMerchandiseHistory: 'getmerchandisehistory/',
        deleteMerchandise: 'deleteLsMerchandise/',
    },
    // Use for Merchandise Component
    system: {
        controller: ApiBaseUrl + 'system',
        getOrderStatus: 'getorderstatus/',
        getImpExpStatus: 'getimpexpstatus/',
        getAllWarehouse: 'getallwarehouse'
    },
    // Use for Merchandise Component
    order: {
        controller: ApiBaseUrl + 'order',
        completeAddMerchandise: 'completeaddmerchandise/',
        // Use for 18.Form Thanh Toán đơn hàng - 11
        getOrderViewModelById: 'getOrderViewModelById',
        payListOrder: 'paylistorder',

        // Use for order-buy
        getOrderBuy: 'getorderbuy/',
        saveOrderAfterBuy: 'saveorderafterbuy',
        completedBuyOrder: 'completedbuyorder',
        startBuy: 'startbuy',

        // 41
        getLsOrderPay: 'getlsorderpay',
    },
    // Use for warehouse
    warehouse: {
        controller: ApiBaseUrl + 'warehouse',
        saveWarehouseImp: 'savewarehouseimp',
        completeWarehouseImp: 'completewarehouseimp',
        getWarehouseExpByCode: 'getwarehouseexpbycode',
        getWarehouseImpViewById: 'getwarehouseimpviewbyid',
        deleteLsImpDetail: 'deletelsimpdetail',
    },
    user: {
        controller: ApiBaseUrl + 'user',
        getListStorekeeperInWarehouse: 'getliststorekeeperinwarehouse'
    }
};

export const NavigateRouting = {
    Relative: 'relative',
    Admin: 'admin',
    ChooseCompany: 'choose-company',
    NotFound: '404'
};

export const HttpStatus = {
    CONTINUE: 100,
    SWITCHING_PROTOCOLS: 101,
    PROCESSING: 102,
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NON_AUTHORITATIVE_INFORMATION: 203,
    NO_CONTENT: 204,
    RESET_CONTENT: 205,
    PARTIAL_CONTENT: 206,
    AMBIGUOUS: 300,
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    SEE_OTHER: 303,
    NOT_MODIFIED: 304,
    TEMPORARY_REDIRECT: 307,
    PERMANENT_REDIRECT: 308,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    PROXY_AUTHENTICATION_REQUIRED: 407,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    GONE: 410,
    LENGTH_REQUIRED: 411,
    PRECONDITION_FAILED: 412,
    PAYLOAD_TOO_LARGE: 413,
    URI_TOO_LONG: 414,
    UNSUPPORTED_MEDIA_TYPE: 415,
    REQUESTED_RANGE_NOT_SATISFIABLE: 416,
    EXPECTATION_FAILED: 417,
    I_AM_A_TEAPOT: 418,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    HTTP_VERSION_NOT_SUPPORTED: 505
};
