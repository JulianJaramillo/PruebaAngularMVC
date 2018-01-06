using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebAngularMVC.Models;

namespace WebAngularMVC.Controllers
{
    public class EmpleadoController : Controller
    {
        // GET: Empleado
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>  
        ///   
        /// Get All Employee  
        /// </summary>  
        /// <returns></returns>  
        public JsonResult Get_AllEmployee()
        {
            using (DemoAngularEntities Obj = new DemoAngularEntities())
            {
                var Emp =
 
                (from e in Obj.Empleadoes
                 join t in Obj.Tareas
                 on e.IdTarea equals t.IdTarea
                 select new
                 {
                     IdEmpleado = e.IdEmpleado,
                     NombreEmpleado = e.NombreEmpleado,
                     ApellidoEmpleado = e.ApellidoEmpleado,
                     DescripcionTarea = t.DescripcionTarea,
                     Email = e.Email,
                     Telefono = e.Telefono
                 }).ToList();

                return Json(Emp, JsonRequestBehavior.AllowGet);
            }
        }


        /// <summary>  
        /// Insert New Employee  
        /// </summary>  
        /// <param name="Employe"></param>  
        /// <returns></returns>  
        public string Insert_Employee(Empleado Empleado)
        {
            try
            {
                if (Empleado != null)
                {
                    using (DemoAngularEntities Obj = new DemoAngularEntities())
                    {
                        Obj.Empleadoes.Add(Empleado);
                        Obj.SaveChanges();
                        return "Empleado Inserto correctamente";
                    }
                }
                else
                {
                    return "No Se Inserto Correctamente el Empleado";
                }

            }

            catch (Exception e)
            {
                Console.WriteLine("{0} Exception caught.", e);
                return "Null";
            }
        }


        /// <summary>  
        /// Update Employee Information  
        /// </summary>  
        /// <param name="Emp"></param>  
        /// <returns></returns>  
        public string Update_Employee(Empleado Emp)
        {
            if (Emp != null)
            {
                using (DemoAngularEntities Obj = new DemoAngularEntities())
                {
                    var Emp_ = Obj.Entry(Emp);
                    Empleado EmpObj = Obj.Empleadoes.Where(x => x.IdEmpleado == Emp.IdEmpleado).FirstOrDefault();
                    EmpObj.NombreEmpleado = Emp.NombreEmpleado;
                    EmpObj.ApellidoEmpleado = Emp.ApellidoEmpleado;
                    EmpObj.IdTarea = Emp.IdTarea;
                    EmpObj.Email = Emp.Email;
                    EmpObj.Telefono = Emp.Telefono;
                    Obj.SaveChanges();
                    return "Empleado Actualiazado Correctamente";
                }
            }
            else
            {
                return "El Empleado no se ha actualizado correctamente ";
            }
        }

        /// <summary>  
        /// Delete Employee Information  
        /// </summary>  
        /// <param name="Emp"></param>  
        /// <returns></returns>  
        public string Delete_Employee(Empleado Emp)
        {
            if (Emp != null)
            {
                using (DemoAngularEntities Obj = new DemoAngularEntities())
                {
                    var Emp_ = Obj.Entry(Emp);
                    if (Emp_.State == System.Data.EntityState.Detached)
                    {
                        Obj.Empleadoes.Attach(Emp);
                        Obj.Empleadoes.Remove(Emp);
                    }
                    Obj.SaveChanges();
                    return "Empleado Eliminado ";
                }
            }
            else
            {
                return "Employee Not Deleted! Try Again";
            }
        }

        /// <summary>  
        /// Insert New Employee  
        /// </summary>  
        /// <param name="Tarea"></param>  
        /// <returns></returns>  
        public string Insert_Tarea(Tarea Tarea)
        {
            if (Tarea != null)
            {
                using (DemoAngularEntities Obj = new DemoAngularEntities())
                {
                    Obj.Tareas.Add(Tarea);
                    Obj.SaveChanges();
                    return "Tarea se Inserto Correctamente";
                }
            }
            else
            {
                return "No Se Inserto Correctamente La Tarea";
            }
        }
    }
}