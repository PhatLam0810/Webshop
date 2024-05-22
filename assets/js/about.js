
// Kiểm tra xem tài liệu đã tải xong chưa
if (document.readyState == 'loading') {
    // Nếu tài liệu đang được tải, chờ sự kiện DOMContentLoaded
    document.addEventListener('DOMContentLoaded', ready);
} else {
    // Nếu tài liệu đã tải xong, gọi hàm ready() ngay lập tức
    ready();
}

// Hàm được gọi khi tài liệu đã sẵn sàng
function ready() {
    // Gắn sự kiện click cho các nút "Remove" để xóa mặt hàng
    var removeItem = document.getElementsByClassName('btn-danger');
    for (var i = 0; i < removeItem.length; i++) {
        var button = removeItem[i];
        button.addEventListener('click', removeCartItem);
        updateCartTotal();
    }

    // Gắn sự kiện change cho các ô nhập số lượng để cập nhật tổng giỏ hàng
    var quantityInput = document.getElementsByClassName('cart-input');
    for (var i = 0; i < quantityInput.length; i++) {
        var input = quantityInput[i];
        input.addEventListener('change', quantityChange);
        updateCartTotal();
    }

    // Gắn sự kiện click cho các nút "Add to Cart" để thêm mặt hàng vào giỏ hàng
    var addToCartButton = document.getElementsByClassName('shop-btn');
    for (var i = 0; i < addToCartButton.length; i++) {
        var buttonAdd = addToCartButton[i];
        buttonAdd.addEventListener('click', addToCart);
        updateCartTotal();
    }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseClick)
}

// Hàm được gọi khi người dùng nhấn nút "Add to Cart"
function addToCart(event) {
    var button = event.target; // Lấy ra nút "Add to Cart" mà người dùng đã nhấn
    var shopItem = button.parentElement.parentElement; // Lấy ra phần tử cha của nút "Add to Cart", tức là phần tử chứa thông tin mặt hàng
    var title = shopItem.getElementsByClassName('shop-title')[0].innerText; // Lấy ra tiêu đề của mặt hàng từ phần tử chứa thông tin mặt hàng
    var price = shopItem.getElementsByClassName('shop-cost')[0].innerText; // Lấy ra giá của mặt hàng từ phần tử chứa thông tin mặt hàng
    var imgSrc = shopItem.getElementsByClassName('shop-img')[0].src; // Lấy ra đường dẫn hình ảnh của mặt hàng từ phần tử chứa thông tin mặt hàng
    console.log(title, price, imgSrc); // Hiển thị thông tin mặt hàng trong console
    addItemToCart(title, price, imgSrc); // Thêm mặt hàng vào giỏ hàng
    updateCartTotal(); // Cập nhật tổng giỏ hàng sau khi thêm mặt hàng
}

// Hàm thêm mặt hàng vào giỏ hàng
function addItemToCart(title, price, imgSrc) {
    // Kiểm tra xem mặt hàng đã tồn tại trong giỏ hàng chưa
    var cartItem = document.getElementsByClassName('cart-items')[0];
    var cartItemName = cartItem.getElementsByClassName('cart-name');
    for (var i = 0; i < cartItemName.length; i++) {
        if (cartItemName[i].innerText == title) {
            // Nếu đã tồn tại, tăng số lượng lên 1 và cập nhật tổng giỏ hàng
            var quantityElement = cartItemName[i].parentElement.parentElement.getElementsByClassName('cart-input')[0];
            quantityElement.value = parseInt(quantityElement.value) + 1;
            updateCartTotal();
            return;
        }
    }
    // Nếu chưa tồn tại, thêm mặt hàng mới vào giỏ hàng với số lượng là 1
var cartRow = document.createElement('div'); // Tạo một phần tử div mới để chứa thông tin mặt hàng trong giỏ hàng
cartRow.classList.add(`cart-row`); // Thêm class 'cart-row' vào phần tử div mới
var cartRowContents = `   
    <div class="cart-item cart-column">
        <img class="cart-img" src="${imgSrc}" width="100" height="100">
        <span class="cart-name">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-input" type="number" value="1"> <!-- Ô nhập số lượng với giá trị mặc định là 1 -->
        <button class="btn btn-danger cart-button" type="button">Remove</button>
    </div>`;
cartRow.innerHTML = cartRowContents; // Gán nội dung HTML vào phần tử div mới
cartItem.append(cartRow); // Thêm phần tử div mới vào giỏ hàng

// Gắn sự kiện click cho nút "Remove" và sự kiện change cho ô nhập số lượng
cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem); // Gắn sự kiện click cho nút "Remove"
cartRow.getElementsByClassName('cart-input')[0].addEventListener('change', quantityChange); // Gắn sự kiện change cho ô nhập số lượng
updateCartTotal(); // Cập nhật tổng giỏ hàng
}
// Hàm được gọi khi số lượng mặt hàng thay đổi
function quantityChange(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

// Hàm được gọi khi người dùng nhấn nút "Remove"
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

// Hàm tính toán và cập nhật tổng giỏ hàng
function updateCartTotal() {
    // Lấy phần tử chứa giỏ hàng
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    // Lấy tất cả các hàng trong giỏ hàng
    var cartRow = cartItemContainer.getElementsByClassName('cart-row');
    // Khởi tạo biến tổng giá trị của giỏ hàng
    var total = 0;

    // Duyệt qua từng hàng trong giỏ và tính tổng giá trị
    for (var i = 0; i < cartRow.length; i++) {
        var cartRows = cartRow[i];
        // Lấy phần tử chứa giá của mặt hàng
        var priceElement = cartRows.getElementsByClassName('cart-price')[0];
        // Lấy phần tử chứa số lượng của mặt hàng
        var quantityElement = cartRows.getElementsByClassName('cart-input')[0];

        // Kiểm tra nếu phần tử số lượng tồn tại
        if (quantityElement) {
            // Lấy giá và số lượng của mặt hàng
            var price = parseFloat(priceElement.innerText.replace('$', ''));
            var quantity = quantityElement.value;
            // Nếu số lượng hợp lệ, tính tổng giá trị
            if (!isNaN(quantity)) {
                total = total + (price * quantity);
            }
        }
    }
    // Cập nhật tổng giá trị trên trang web
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}
// Hàm xóa đơn hàng khi mua
function purchaseClick() {
    // Hiển thị thông báo cảm ơn người dùng đã mua hàng
    alert('Cảm ơn bạn đã mua hàng');

    // Lấy ra phần tử chứa các mặt hàng trong giỏ hàng
    var cartItems = document.getElementsByClassName('cart-items')[0];

    // Xóa tất cả các mặt hàng trong giỏ hàng
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }

    // Cập nhật tổng giỏ hàng sau khi xóa
    updateCartTotal();
}