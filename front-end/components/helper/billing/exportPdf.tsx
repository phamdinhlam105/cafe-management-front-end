
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';


const MAX_PRODUCT_NAME_LENGTH = 20;

export const generatePdf = async (orderData: any) => {

    const pageWidth = 283.46;
    const pageHeight = 250 + orderData.details.length * 16;


    const fontUrl = '/fonts/times.ttf'; // Đây là đường dẫn tới font trong thư mục public
    // Tải font từ URL
    const fontBytes = await fetch(fontUrl).then(res => res.arrayBuffer());

    // Tạo một PDF mới
    const pdfDoc = await PDFDocument.create();

    // Đăng ký fontkit để sử dụng font tùy chỉnh
    pdfDoc.registerFontkit(fontkit);

    // Nhúng font vào PDF
    const font = await pdfDoc.embedFont(fontBytes);

    let page = pdfDoc.addPage([pageWidth, pageHeight]);
    // Thêm một trang vào PDF

    // Lấy đối tượng đồ họa để vẽ lên trang
    const { width, height } = page.getSize();

    // Tiêu đề
    const title = 'HÓA ĐƠN BÁN HÀNG';
    const titleWidth = font.widthOfTextAtSize(title, 16);
    const titleX = (width - titleWidth) / 2;
    page.drawText(title, {
        x: titleX,
        y: height - 30,
        size: 16,
        font
    });
    // Thêm thông tin đơn hàng
    page.drawText(`Mã đơn: ${orderData.id}`, { x: 10, y: height - 70, size: 11, font });
    page.drawText(`Ngày: ${new Date(orderData.createdAt).toLocaleString()}`, { x: 10, y: height - 85, size: 11, font });
    page.drawText(`Khách hàng: ${orderData.customerName}`, { x: 10, y: height - 100, size: 11, font });
    const table = `Bàn số ${orderData.no}`;
    const tableWidth = font.widthOfTextAtSize(table, 11);
    const tableX = (width - tableWidth) - 10;
    page.drawText(table, {
        x: tableX,
        y: height - 100,
        size: 11,
        font
    });
    // Chi tiết đơn hàng
    const tableTop = height - 120;
    const rowHeight = 16;
    const columnWidths = [20, 100, 60, 40, 65];

    page.drawText('STT', { x: 2, y: tableTop - 10, size: 10, font });
    page.drawText('Tên sản phẩm', { x: 22, y: tableTop - 10, size: 10, font });
    page.drawText('Giá (VNĐ)', { x: 122, y: tableTop - 10, size: 10, font });
    page.drawText('Số lượng', { x: 182, y: tableTop - 10, size: 10, font });
    page.drawText('Tổng (VNĐ)', { x: 222, y: tableTop - 10, size: 10, font });

    page.drawRectangle({
        x: 0, y: tableTop - rowHeight, width: columnWidths[0], height: rowHeight, borderColor: rgb(0, 0, 0), borderWidth: 1,
    });
    page.drawRectangle({
        x: 20, y: tableTop - rowHeight, width: columnWidths[1], height: rowHeight, borderColor: rgb(0, 0, 0), borderWidth: 1,
    });
    page.drawRectangle({
        x: 120, y: tableTop - rowHeight, width: columnWidths[2], height: rowHeight, borderColor: rgb(0, 0, 0), borderWidth: 1,
    });
    page.drawRectangle({
        x: 180, y: tableTop - rowHeight, width: columnWidths[3], height: rowHeight, borderColor: rgb(0, 0, 0), borderWidth: 1,
    });
    page.drawRectangle({
        x: 220, y: tableTop - rowHeight, width: columnWidths[4], height: rowHeight, borderColor: rgb(0, 0, 0), borderWidth: 1,
    });


    let yOffset = tableTop - rowHeight - 10;
    orderData.details.forEach((d: any, index: number) => {
        page.drawText((index + 1).toString(), { x: 2, y: yOffset - 10, size: 10, font }); // STT
        page.drawText(truncateProductName(d.productName), { x: 22, y: yOffset - 10, size: 10, font }); // Tên sản phẩm
        page.drawText(`${(d.total / d.quantity).toLocaleString()}`, { x: 122, y: yOffset - 10, size: 10, font }); // Giá
        page.drawText(d.quantity.toString(), { x: 182, y: yOffset - 10, size: 10, font }); // Số lượng
        page.drawText(`${d.total.toLocaleString()}`, { x: 222, y: yOffset - 10, size: 10, font }); // Tổng

        // Vẽ các đường viền cho mỗi hàng
        page.drawRectangle({
            x: 0, y: yOffset - rowHeight, width: columnWidths[0], height: rowHeight, borderColor: rgb(0, 0, 0), borderWidth: 1,
        });
        page.drawRectangle({
            x: 20, y: yOffset - rowHeight, width: columnWidths[1], height: rowHeight, borderColor: rgb(0, 0, 0), borderWidth: 1,
        });
        page.drawRectangle({
            x: 120, y: yOffset - rowHeight, width: columnWidths[2], height: rowHeight, borderColor: rgb(0, 0, 0), borderWidth: 1,
        });
        page.drawRectangle({
            x: 180, y: yOffset - rowHeight, width: columnWidths[3], height: rowHeight, borderColor: rgb(0, 0, 0), borderWidth: 1,
        });
        page.drawRectangle({
            x: 220, y: yOffset - rowHeight, width: columnWidths[4], height: rowHeight, borderColor: rgb(0, 0, 0), borderWidth: 1,
        });

        // Giảm yOffset để vẽ hàng tiếp theo
        yOffset -= rowHeight;
    });

    // Thêm tổng tiền
    const totalText = `Tổng tiền: ${orderData.total.toLocaleString()} VND`;
    const totalTextWidth = font.widthOfTextAtSize(totalText, 12); // Giảm kích thước font
    const totalX = width - totalTextWidth - 20; // Căn phải với khoảng cách 50px từ mép phải
    page.drawText(totalText, {
        x: totalX,
        y: yOffset - 20,
        size: 12, // Font nhỏ hơn
        font
    });
    yOffset -= 20;

    const seperatorText = `--------------------------------------------------------------------------------`;
    const seperatorTextWidth = font.widthOfTextAtSize(seperatorText, 12);
    const seperatorTextX = (width - seperatorTextWidth) / 2;
    page.drawText(seperatorText, {
        x: seperatorTextX,
        y: yOffset - 20,
        size: 12,
        font
    });
    yOffset -= 20;
    const thanksText = `CẢM ƠN QUÝ KHÁCH`;
    const thanksTextWidth = font.widthOfTextAtSize(thanksText, 14);
    const thanksTextX = (width - thanksTextWidth) / 2;
    page.drawText(thanksText, {
        x: thanksTextX,
        y: yOffset - 20,
        size: 14,
        font
    });
    yOffset -= 20;

    // Lưu PDF và tạo Blob
    const pdfBytes = await pdfDoc.save();

    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Tạo URL cho Blob và tải file xuống
    const url = URL.createObjectURL(pdfBlob);
    const newTab = window.open(url, '_blank');
    if (newTab) {
        newTab.focus();
    }

    // Giải phóng bộ nhớ
    URL.revokeObjectURL(url);
}

const truncateProductName = (name: string) => {
    if (name.length > MAX_PRODUCT_NAME_LENGTH) {
        return name.substring(0, MAX_PRODUCT_NAME_LENGTH) + '...';
    }
    return name;
};
