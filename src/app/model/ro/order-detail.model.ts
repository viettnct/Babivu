import { LService } from '../lservice.model';

export class OrderDetailRO {
    orderData: OrderData = new OrderData();
    lsOrderDetail: LOrderDetail[] = new Array<LOrderDetail>();
    lsService: LService[] = new Array<LService>();
    deliveryAddress: DeliveryAddress = new DeliveryAddress();
    lsMerchandise: Merchandise[] = new Array<Merchandise>();
    lsOrderHistory: OrderHistory[] = new Array<OrderHistory>();
    lsReceipt: Receipt[] = new Array<Receipt>();
    lsOrderChat: OrderChat[] = new Array<OrderChat>();
    lsComplain: Complain[] = new Array<Complain>();
}

export class OrderData {
    orderId;
    orderCode;
    orderNumber;
    orderImage;
    paymentLink;
    userId;
    userName;
    userLevel;
    depositRate;
    sender;
    senderLink;
    senderContact;
    deliveryAddressId;
    exchangeRate;
    netWeight;
    chargedWeight;
    totalPrice;
    totalFee;
    amount;
    promotion;
    promotionOrder;
    paid;
    missing;
    refundAmount;
    totalBuyPrice;
    shippingType;
    warehouseStartedId;
    warehouseEndId;
    orderSource;
    customerId;
    description;
    createdDate;
    type;
    typeDisplay;
    typeLink;
    status;
    paymentStatus;
    statusDisplay;
    paymentStatusDisplay;
    totalQuantityOrder;
    totalQuantityBuy;
    promotionBuy;
    totalQuantityReceived;
    paymentWeigth;
    lsService;
    lsMerchandise;
}

export class LOrderDetail {
    orderDetailId;
    orderId;
    itemCode;
    itemName;
    itemLink;
    itemImage;
    status;
    quantityOrder;
    quantityBuy;
    quantityReceived;
    quantityPayment;
    propetiesType;
    propetiesName;
    propetiesImage;
    orderOriginalPrice;
    buyOriginalPrice;
    orderPrice;
    buyPrice;
    description;
    totalOrderOriginalPrice;
    totalBuyOriginalPrice;
    totalOrderPrice;
    totalBuyPrice;
}

export class DeliveryAddress {
    deliveryAddressId;
    deliveryAddressCode;
    userId;
    receiver;
    phone;
    email;
    city;
    cityDisplay;
    district;
    districtDisplay;
    address;
    description;
}

export class Merchandise {
    merchandiseId;
    merchandiseCode;
    orderId;
    netWeight;
    chargedWeight;
    paymentWeight;
    length;
    width;
    height;
    status;
    statusDisplay;
    type;
    createdDate;
    changeDate;
}

export class OrderHistory {
    orderHistoryId;
    orderId;
    orderStatus;
    orderStatusDisplay;
    historyDate;
    content;
    createdUserId;
}

export class Receipt {
    receiptId;
    receiptCode;
    receiptNo;
    receiptDate;
    amount;
    convertedAmount;
    paymentType;
    paymentId;
    description;
    receiptType;
    currencyId;
    exchangeRate;
    status;
    statusDisplay;
    orderId;
    walletSource;
    walletDestination;
    withdrawalRequestId;
    reasion;
    reasionDisplay;
    createdUserId;
    createdUserName;
    depositUserName;
    walletName;
    currencyShortDisplay;
}

export class OrderChat {
    orderChatId;
    orderId;
    userId;
    content;
    chatTime;
    chatName;
    orderChatRole;
    status;
}

export class Complain {
    complainId;
    orderId;
    orderDetailId;
    itemCode;
    complainType;
    complainTypeDisplay;
    complainContent;
    complainSettle;
    status;
    statusDisplay;
    createdDate;
    changeDate;
}
