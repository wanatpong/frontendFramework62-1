import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BackendService } from "../backend.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitting: Boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private backendService: BackendService
  ) {}

  ngOnInit() {
    // เป็น initial form ค่าฟอร์มเริ่มต้น
    this.registerForm = this.formBuilder.group({
      rank: ["", Validators.required],
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      id_mil: ["", Validators.required],
      unit_name: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  get f() {
    // เข้าถึงค่าของฟอร์ม
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitting = true;
    // เมื่อเรากดปุ่ม register ให้มาที่ ฟังก์ชั่นนี้
    console.log(this.f.rank.value);

    if (!this.registerForm.invalid) {
      this.backendService
        .register(
          this.f.rank.value,
          this.f.first_name.value,
          this.f.last_name.value,
          this.f.id_mil.value,
          this.f.unit_name.value,
          this.f.username.value,
          this.f.password.value
        )
        .subscribe(data => {
          if (data) {
            if (data.status == true) {
              //alert("Register success!");
              Swal.fire("การลงทะเบียนของท่าน เรียบร้อย");
              this.router.navigate(["/home"]);
            } else {
              //alert(data.message);
              //alert("โปรดตั้ง USERNAME ใหม่ ชื่อโหลนี้ไปแล้วครับท่าน !");
              Swal.fire("โปรดตั้ง USERNAME ใหม่ ชื่อโหลนี้ไปแล้วครับท่าน !");
            }
          }
          this.submitting = false;
        });
    } else {
      //alert("Invalid!"); // show mesage กรณีกรอกข้อมูลไม่ครบใน input
      Swal.fire('"กรุณากรอกข้อมูลให้ครบ"');
      this.submitting = false;
    }
  }
}
// เข้าสู่ Front-End
