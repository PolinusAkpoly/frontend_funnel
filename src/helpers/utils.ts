import { apiUrl } from "../api/apiUtils"
import { getItem } from "./localsorage.service"

export const excludePath = ["/dashboard",]

// export const getMetas = (metas: Meta[], name: string) => {
//     let value = ""

//     const datas = metas.filter(meta => meta.name === name)

//     if (datas.length) {
//         value = datas[0].value
//     }


//     return value
// }

export const viewDate = (date: any): any => {
    if (!date) {
        return ""
    }

    const newDate = new Date(date);
    return newDate.toISOString().slice(0, 16);
}

export const setCookie = (name: string, value: string, days: number = 10) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    const cookieValue = `${name}=${value};expires=${expirationDate.toUTCString()};path=/`;
    document.cookie = cookieValue;
}
export const getCookie = (name: string) => {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split('=');
        if (cookie[0] === name) {
            return cookie[1];
        }
    }
    return null;
}

export const deleteCookie = (name: string) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  };

export const getToken = () => {
    const auth: any = getItem("auth")

    if (auth && auth.token) {
        setCookie("ouitube_token", auth.token)
        return auth.token
    }
    deleteCookie("ouitube_token")
    return ""
}


export const interceptRequest = (event: Event) => {
    console.log("=========== interceptRequest ==========");

    const request = event as CustomEvent;
    const xhr = request.detail.xhr;
    const token = getToken(); // Remplacez par votre token


    // Ajout du token dans l'en-tête de la requête
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
};

export const formatVideoUri = (videoUri: any) => {
    return apiUrl?.slice(0, -1) + videoUri
}
export const capitalizeFirstLetter = (input: string): string => {
    if (input.length === 0) {
        return input; // Si la chaîne est vide, retourne la chaîne inchangée.
    }

    const firstLetter = input[0].toUpperCase(); // Convertit le premier caractère en majuscule.
    const restOfTheString = input.slice(1); // Récupère le reste de la chaîne.

    return firstLetter + restOfTheString; // Concatène la première lettre en majuscule avec le reste de la chaîne.
}
export const analyzeRoute = (route: string): Record<string, string | null> | null => {
    // Utilise une expression régulière pour extraire les détails (avec la troisième partie en option)
    const regex = /^\/([^/]+)\/([^/]+)\/([^/]+)(?:\/([^/]+))?$/; // La troisième partie est facultative.

    // Utilise la méthode exec() pour obtenir les correspondances
    // const matches = regex.exec(route);

    const matches = route.match(regex);




    // Vérifie si la route correspond au modèle
    if (matches) {
        // matches[0] contient la correspondance complète
        const completeRoute = matches[0];
        // matches[1] contient le premier détail (par exemple, "update")
        const part1 = matches[1];
        const part2 = matches[2];
        const part3 = matches[3];
        const part4 = matches[4]


        // Crée un objet contenant les détails analysés
        const details: Record<string, string | null> = {
            completeRoute,
            domaine: capitalizeFirstLetter(part1),
            action: capitalizeFirstLetter(part2),
            entity: capitalizeFirstLetter(part3),
        };

        console.log({ details });


        // Vérifie si la troisième partie est présente et l'ajoute à l'objet si nécessaire
        if (part4) {
            details.id = part4;
        }

        return details;
    } else {
        return null; // La route ne correspond pas au modèle.
    }
}

export const getFieldsFromInterface = <T>(inputInterface: T): (keyof T)[] => {
    const fields: (keyof T)[] = [];

    for (const key in inputInterface) {
        if (Object.prototype.hasOwnProperty.call(inputInterface, key)) {
            fields.push(key as keyof T);
        }
    }

    return fields;
}

const cleanImageUrl = (imageUrl: string) => {
    const newImageUrl = apiUrl + "assets" + imageUrl.split("/assets")[1]
    return newImageUrl
}
export const cleanData = (datas: any) => {
    if (datas.isSuccess) {
        if (datas?.result) {
            if (datas?.result?.imageUrl) {
                datas.result.imageUrl = cleanImageUrl(datas.result.imageUrl)
            }
            if (datas?.result?.imageUrls) {
                datas.result.imageUrls = datas.result.imageUrls.map((imageUrl: string) => {
                    return cleanImageUrl(imageUrl)
                })
            }
            if (datas?.result?.posterFiles) {
                datas.result.posterFiles = datas.result.posterFiles.map((imageUrl: string) => {
                    return cleanImageUrl(imageUrl)
                })
            }
        }
        if (datas?.results) {
            datas.results = datas?.results.map((result: any) => {
                if (result?.imageUrl) {
                    result.imageUrl = cleanImageUrl(result.imageUrl)
                }
                if (result?.imageUrls) {
                    result.imageUrls = result.imageUrls.map((imageUrl: string) => {
                        return cleanImageUrl(imageUrl)
                    })
                }
                if (result?.posterFiles) {
                    result.posterFiles = result.posterFiles.map((imageUrl: string) => {
                        return cleanImageUrl(imageUrl)
                    })
                }
                return result
            });
        }
    }
    return datas
}

export const reductionRate = (product: any) => {
    let result = 0
    // const { solde_price, regular_price} = product
    result = (product.regular_price - product.solde_price) * 100 / product.regular_price
    return result.toFixed(0)
}

export const loadScript = () => {
    const firstScript = document.getElementById('firstScript')
    firstScript?.remove()
    // if(!firstScript){
    const script = document.createElement('script')
    script.src = "/assets/js/scripts.js"
    script.id = "firstScript"
    document.body.appendChild(script)
    // }
}

export const generateFileUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error("Aucune vidéo sélectionnée."));
            return;
        }

        if (!file.type.startsWith("video/")) {
            reject(new Error("Le fichier sélectionné n'est pas une vidéo."));
            return;
        }

        const reader = new FileReader();

        reader.onload = (event: ProgressEvent<FileReader>) => {
            const videoBlob = new Blob([(event.target?.result as any)], { type: file.type });
            const videoUrl = URL.createObjectURL(videoBlob);
            resolve(videoUrl);
        };

        reader.onerror = () => {
            reject(new Error("Erreur lors de la lecture de la vidéo."));
        };

        reader.readAsArrayBuffer(file);
    });

}

export const validateRegisterForm = (values: any) => {
    const errors: any = {};
    if (!values.fullName) {
        errors.fullName = 'Required';
    } else if (values.fullName.length > 15) {
        errors.fullName = 'Must be 15 characters or less';
    }


    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 6) {
        errors.password = 'Must be 6 characters or more';
    } else if (values.password.length > 20) {
        errors.password = 'Must be 15 characters or less';
    } else if (!values.confirmPassword) {
        errors.confirmPassword = 'Required';
    } else if (values.password.length < 6) {
        errors.password = 'Must be 6 characters or more';
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'The password not match';
    } else if (values.confirmPassword.length > 20) {
        errors.confirmPassword = 'Must be 15 characters or less';
    }

    return errors;
};
export const validateAddressForm = (values: any) => {
    const errors: any = {};
    if (!values.address_type) {
        errors.address_type = 'Required';
    }
    if (!values.name) {
        errors.name = 'Required';
    }
    if (!values.street) {
        errors.street = 'Required';
    }

    if (!values.phone) {
        errors.phone = 'Required';
    }
    if (!values.city) {
        errors.city = 'Required';
    }
    if (!values.code_postal) {
        errors.code_postal = 'Required';
    }
    if (!values.state) {
        errors.state = 'Required';
    }

    return errors;
};
export const validateLoginForm = (values: any) => {
    const errors: any = {};

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    }
    else if (values.password.length < 6) {
        errors.password = 'Must be 6 characters or more';
    }
    else if (values.password.length > 20) {
        errors.password = 'Must be 15 characters or less';
    }



    return errors;
};
export const validateSubscribeForm = (values: any) => {
    const errors: any = {};

    if (!values.fullName) {
        errors.fullName = 'Required';
    } else if (values.fullName.length > 15) {
        errors.fullName = 'Must be 15 characters or less';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
};

export const formatPrice = (price: number, currency: string = "EUR") => {
    let options = {
        style: "currency",
        currency: currency
    }
    return new Intl.NumberFormat('fr-FR', options).format(price)
}
export const sonoreEffet = (status = "success") => {
    const audio = document.createElement("audio")
    audio.src = `/assets/audios/${status}.wav`
    audio?.play()
}

export const formattedDate = (currentDate?: string | Date) => {
    if (currentDate) {
        const date = new Date(currentDate)
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Notez que les mois sont indexés à partir de zéro, donc on ajoute 1.
        const year = String(date.getFullYear());
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}`;

    }
    return ''
}

export const formatDuration = (duration?: string) => {
    let formattedDuration = '';
    if (duration) {
        const [hours, minutes, seconds] = duration?.split(':').map(Number);


        if (hours > 0) {
            formattedDuration += hours + 'h ';
        }

        if (minutes > 0) {
            formattedDuration += minutes + 'm ';
        }

        formattedDuration += seconds + 's';

    }

    return formattedDuration;
}

export const generateId = () => {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
}











