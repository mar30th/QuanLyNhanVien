function CallApi() {
    this.fetchListData = function () {
        return axios({
            url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien",
            method: "GET",
        });
    };

    this.deleteEmployee = function (maNhanVien) {
        return axios({
            url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${maNhanVien}`,
            method: "DELETE",
        })
    }

    this.addEmployee = function (employee) {
        return axios ({
            url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien",
            method: "POST",
            data: employee,
        });
    };

    this.getEmployeeByID = function (maNhanVien) {
        return axios ({
            url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${maNhanVien}`,
            method: "GET",
        })
    }

    this.putEmployeeByID = function (employee) {
        return axios ({
            url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${employee.maNhanVien}`,
            method: "PUT",
            data: employee,
        })   
    }
};