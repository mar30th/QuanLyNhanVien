var callApi = new CallApi;

function getEle(id) {
    return document.getElementById(id);
  }

//Gọi hàm lấy danh sách nhân viên
getListEmployee();

// Lấy danh sách nhân viên từ API
function getListEmployee() {
  callApi
    .fetchListData()
    .then(function(result) {
      renderData(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

//Thêm nhân viên
//Tạo button Thêm trong giao diện
getEle("btnThemNV").addEventListener("click", function (){
  resetForm;
  document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm mới nhân viên";
  var btnAdd = `<button class="btn btn-success" onclick="handleAdd()">Thêm</button>`
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
});
//Thuật toán thêm nhân viên
function handleAdd(){
  var heSoChucVu = "";
  var maNV = getEle("MaNV").value;
  var tenNV = getEle("TenNV").value;
  var chucVu = getEle("ChucVu").value;
  var luongNV = getEle("LuongNV").value;
  var gioLam = getEle("GioLam").value;
  if (chucVu == 1){
    heSoChucVu = 1;
    chucVu = "Nhân viên";
  }else if (chucVu == 2){
    heSoChucVu = 2;
    chucVu = "Quản lý";
  }else if(chucVu == 3){
    heSoChucVu = 3;
    chucVu = "Giám đốc";
  };

  var employee = new NhanVien (maNV, tenNV, chucVu, heSoChucVu, luongNV, gioLam);
  
  callApi
    .addEmployee(employee)
    .then (function(){
      getListEmployee();
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function(error){
      console.log(error);
    });
}

//Cập nhật thông tin nhân viên
//Lấy thông tin cũ
function handleEdit(maNhanVien){
  document.getElementsByClassName("modal-title")[0].innerHTML = "Sửa thông tin nhân viên";
  var btnUpdate = `<button class="btn btn-success" onclick="handleUpdate(${maNhanVien})">Cập nhật</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;
  
  callApi
    .getEmployeeByID (maNhanVien)
    .then(function (result) {
      var employee = result.data;
      getEle("MaNV").value = employee.maNhanVien;
      getEle("TenNV").value = employee.tenNhanVien;
      getEle("ChucVu").value = test(employee.chucVu);
      getEle("LuongNV").value = employee.luongCoBan;
      getEle("GioLam").value = employee.soGioLamTrongThang;
      console.log(employee.chucVu);
      
    })
    .catch(function (error){
      console.log(error);
    })

  console.log(maNhanVien);
};

//Cập nhật thông tin mới
function handleUpdate (){
  var heSoChucVu = "";
  var maNV = getEle("MaNV").value;
  var tenNV = getEle("TenNV").value;
  var chucVu = getEle("ChucVu").value;
  var luongNV = getEle("LuongNV").value;
  var gioLam = getEle("GioLam").value;
  if (chucVu == 1){
    heSoChucVu = 1;
    chucVu = "Nhân viên";
  }else if (chucVu == 2){
    heSoChucVu = 2;
    chucVu = "Quản lý";
  }else if(chucVu == 3){
    heSoChucVu = 3;
    chucVu = "Giám đốc";
  };

  var employee = new NhanVien (maNV, tenNV, chucVu, heSoChucVu, luongNV, gioLam);
  callApi
    .putEmployeeByID(employee)
    .then(function () {
      getListEmployee();
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    })
};


//Xoa Nhan Vien
function handleDelete(maNhanVien){
  callApi
    .deleteEmployee (maNhanVien)
    .then(function () {
      getListEmployee();
    })
    .catch(function (error) {
      console.log(error);
    })

};


//Reset Form
function resetForm(){
  getEle("formNV").reset();
}

// RenderData từ API
function renderData(data) {
  var content = "";
  data.forEach(function (employee) {
    var loaiNV = "";
    if(employee.soGioLamTrongThang >= 192){
        loaiNV = "Nhân viên xuất sắc";
    }else if(employee.soGioLamTrongThang >= 176){
        loaiNV = "Nhân viên giỏi";
    }else if(employee.soGioLamTrongThang >= 160){
        loaiNV = "Nhân viên khá";
    }else if(employee.soGioLamTrongThang < 160){
        loaiNV = "Nhân viên trung bình"
    }
    content += `
    <tr>
        <td>${employee.maNhanVien}</td>
        <td>${employee.tenNhanVien}</td>
        <td>${employee.chucVu}</td>
        <td>${employee.luongCoBan}</td>
        <td>${employee.heSoChucVu*employee.luongCoBan}</td>
        <td>${employee.soGioLamTrongThang}</td>
        <td>${loaiNV}</td>
        <td>
        <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="handleEdit(${
          employee.maNhanVien
        })">Edit</button>
        <button class="btn btn-danger" onclick="handleDelete(${
          employee.maNhanVien
        })">Delete</button>
    </td>
    </tr>
    `;
  });
  getEle("tblDanhSachNV").innerHTML = content;
}

function test(chucVu){
  var value = "";
  if (chucVu = "Giám đốc"){
    value = 3;
  }else if(chucVu = "Quản lý") {
    value = 2;
  }else if(chucVu = "Nhân viên") {
    value = 1;
  }
  return value;
}