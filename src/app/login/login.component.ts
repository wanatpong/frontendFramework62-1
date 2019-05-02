import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { BackendService } from "../backend.service";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitting: Boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private backendService: BackendService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  get f() {
    // เข้าถึงค่าของฟอร์ม
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitting = true;
    // เมื่อเรากดปุ่ม login ให้มาที่ ฟังก์ชั่นนี้
    if (!this.loginForm.invalid) {
      this.backendService
        .login(this.f.username.value, this.f.password.value)
        .subscribe(data => {
          if (data.status) {
            Swal.fire({
              type: "success",
              title: "ยินดีต้อนรับ",
              text: "เข้าสู่ สถาบันวิชาการป้องกันประเทศ"
            });
            this.router.navigate(["/home"]);
          } else {
            //alert("login fail!");
            Swal.fire({
              type: "error",
              title: "ไม่สำเร็จ",
              text: "เกิดความผิดพลาด",
              footer: "<a href>ลืมรหัสผ่าน</a>"
            });
            this.router.navigate(["/login"]);
          }
          this.submitting = false;
        });
    } else {
      //alert("Invalid!"); // show mesage กรณีกรอกข้อมูลไม่ครบใน input
      Swal.fire("กรุณากรอกข้อมูลให้ครบ");
      this.submitting = false;
    }
  }
}
