import { AlertController, ToastController } from "@ionic/angular";

let alertCtrl = new AlertController()
let toastCtrl = new ToastController()
export const getFechaActual = () => {
    const now = new Date();
    return [padTo2Digits(now.getDate()), padTo2Digits(now.getMonth() + 1), now.getFullYear()].join('/')
}

const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, '0');
}

export const validarCelular = async (celular: any) => {
    let res = /^\d{10}$/.test(celular!)
    if (!res) {
        const toast = await toastCtrl.create({
            message: 'Ingresa un número de teléfono a 10 dígitos',
            duration: 1000,
            color: 'dark',
            position: 'top',
        });
        toast.present();
    }
    return res
}

export const validarCampo = async (str: any, titulo: any) => {
    str = str == undefined ? '' : str
    let res = str.trim().length > 0;
    if (!res) {
        const toast = await toastCtrl.create({
            message: `Ingresa ${titulo}`,
            duration: 1000,
            color: 'dark',
            position: 'top',
        });
        toast.present();
    }
    return res;
}

export const validarPago = async (pagado: number, total: number, concepto: any) => {
    let res = Number(pagado ?? 0) <= Number(total ?? 0) || total == 0
    if (!res) {
        const toast = await toastCtrl.create({
            message: `El valor del pago no puede superar el ${concepto}`,
            duration: 1000,
            color: 'dark',
            position: 'top',
        });
        toast.present();
    }
    return res
}

export const porFechasRecientes = (a: any, b: any) => {
    if (a.seconds > b.seconds) {
        return -1;
    }
    if (a.seconds < b.seconds) {
        return 1;
    }
    return 0
}

export const porFechasAntiguas = (a: any, b: any) => {
    if (a.seconds > b.seconds) {
        return 1;
    }
    if (a.seconds < b.seconds) {
        return -1;
    }
    return 0
}