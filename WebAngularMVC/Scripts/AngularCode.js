var app = angular.module("myApp", []);  
app.controller("myCtrl", function($scope, $http) {  
    debugger;  

    $scope.GetAllData = function() {  
        $http({  
            method: "get",  
            url: "http://localhost:54009/Empleado/Get_AllEmployee"
        }).then(function(response) {  
            $scope.empleadoes = response.data;
        }, function() {  
            alert("Se ha Presentado un error");  
        })  
    };

    $scope.InsertData = function () {
        var Action = document.getElementById("btnSave").getAttribute("value");
        if (Action == "Submit") {
            $scope.Empleado = {};
            $scope.Empleado.NombreEmpleado = $scope.EmpNombre;
            $scope.Empleado.ApellidoEmpleado = $scope.EmpApellido;
            $scope.Empleado.IdTarea = $scope.EmpTarea;
            $scope.Empleado.Email = $scope.EmpEmail;
            $scope.Empleado.Telefono = $scope.EmpTelefono;
            $http({
                method: "post",
                url: "http://localhost:54009/Empleado/Insert_Employee",
                datatype: "json",
                data: JSON.stringify($scope.Empleado)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllData();
                $scope.EmpNombre = "";
                $scope.EmpApellido = "";
                $scope.EmpTarea = "";
                $scope.EmpEmail = "";
                $scope.EmpTelefono = "";
            })
        } else {
            $scope.Empleado = {};
            $scope.Empleado.NombreEmpleado = $scope.EmpNombre;
            $scope.Empleado.ApellidoEmpleado = $scope.EmpApellido;
            $scope.Empleado.IdTarea = $scope.EmpTarea;
            $scope.Empleado.Email = $scope.EmpEmail;
            $scope.Empleado.Telefono = $scope.EmpTelefono;
            $scope.Empleado.IdEmpleado = document.getElementById("EmpID_").value;
            $http({
                method: "post",
                url: "http://localhost:54009/Empleado/Update_Employee",
                datatype: "json",
                data: JSON.stringify($scope.Empleado)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllData();
                $scope.EmpNombre = "";
                $scope.EmpApellido = "";
                $scope.EmpTarea = "";
                $scope.EmpEmail = "";
                $scope.EmpTelefono = "";
                document.getElementById("btnSave").setAttribute("value", "Submit");
                document.getElementById("btnSave").style.backgroundColor = "cornflowerblue";
                document.getElementById("spn").innerHTML = "Adicionar Nuevo Empleado";
            })
        }
    }

    $scope.InsertDataTarea = function () {
        var Action = document.getElementById("btnSaveTarea").getAttribute("value");
        if (Action == "GuardarTarea") {
            $scope.Tarea = {};
            $scope.Tarea.DescripcionTarea = $scope.EmpDescripcionTarea;
            $scope.Tarea.EstimadoHoras = $scope.EmpEstimacionTarea;
            $http({
                method: "post",
                url: "http://localhost:54009/Empleado/Insert_Tarea",
                datatype: "json",
                data: JSON.stringify($scope.Tarea)
            }).then(function (response) {
                alert(response.data);
                $scope.EmpDescripcionTarea = "";
                $scope.EmpEstimadoHoras = "";
            })
        }
    }

    $scope.DeleteEmp = function (Emp) {
        $http({
            method: "post",
            url: "http://localhost:54009/Empleado/Delete_Employee",
            datatype: "json",
            data: JSON.stringify(Emp)
        }).then(function (response) {
            alert(response.data);
            $scope.GetAllData();
        })
    };
    $scope.UpdateEmp = function (Emp) {
        document.getElementById("EmpID_").value = Emp.IdEmpleado;
        $scope.EmpNombre = Emp.NombreEmpleado;
        $scope.EmpApellido = Emp.ApellidoEmpleado;
        $scope.EmpTarea = Emp.DescripcionTarea;
        $scope.EmpEmail = Emp.Email;
        $scope.EmpTelefono = Emp.Telefono;
        document.getElementById("btnSave").setAttribute("value", "Update");
        document.getElementById("btnSave").style.backgroundColor = "Yellow";
        document.getElementById("spn").innerHTML = "Actualizar  Informacion Empleado";
    }
})