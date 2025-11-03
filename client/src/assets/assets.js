import logo from "./logo.png";
import logo_full from "./logo_full.svg";
import logo_full_dark from "./logo_full_dark.svg";
import search_icon from "./search_icon.svg";
import user_icon from "./user_icon.svg";
import theme_icon from "./theme_icon.svg";
import send_icon from "./send_icon.svg";
import stop_icon from "./stop_icon.svg";
import mountain_img from "./mountain_img.jpg";
import menu_icon from "./menu_icon.svg";
import close_icon from "./close_icon.svg";
import bin_icon from "./bin_icon.svg";
import logout_icon from "./logout_icon.svg";
import diamond_icon from "./diamond_icon.svg";
import gallery_icon from "./gallery_icon.svg";
import logo_large from "./logo_large.png";

import ai_image1 from "./ai_image1.jpg";
import ai_image2 from "./ai_image2.jpg";
import ai_image3 from "./ai_image3.jpg";
import ai_image4 from "./ai_image4.jpg";
import ai_image5 from "./ai_image5.jpg";
import ai_image6 from "./ai_image6.jpg";
import ai_image7 from "./ai_image7.jpg";
import ai_image8 from "./ai_image8.jpg";
import ai_image9 from "./ai_image9.jpg";
import ai_image10 from "./ai_image10.jpg";
import ai_image11 from "./ai_image11.jpg";
import ai_image12 from "./ai_image12.jpg";
import attachment_icon from "./attachment_icon.png";
import google_icon from "./google_icon.png";

export const assets = {
    logo,
    google_icon,
    attachment_icon,
    logo_full,
    logo_large,
    search_icon,
    user_icon,
    theme_icon,
    send_icon,
    stop_icon,
    mountain_img,
    menu_icon,
    close_icon,
    bin_icon,
    logout_icon,
    logo_full_dark,
    diamond_icon,
    gallery_icon
};

const DUMMY_PDF_ID = "emp-handbook-2025-a1b2c3d4";

export const dummyPdfChats = [
    {
        "_id": "690a1f2b3c4d5e6f7a8b9c0d",
        "userId": "689c6deed410acddc0d95a0e",
        "userName": "GreatStack",
        "pdfId": DUMMY_PDF_ID, // Link to the specific PDF
        "pdfName": "Employee Handbook: General Policies",
        "name": "Handbook Query - PTO",
        "messages": [
            {
                "isImage": false,
                "isPublished": false,
                "role": "user",
                "content": "How many days of paid time off do I get annually?",
                "timestamp": Date.now() - 300000,
            },
            {
                "isImage": false,
                "isPublished": false,
                "role": "assistant",
                "content": "Based on **Section 2: Paid Time Off (PTO)** in the Employee Handbook, all full-time employees accrue **20 days of Paid Time Off (PTO)** per year. Remember that unused PTO does not roll over and must be used by December 31st.",
                "timestamp": Date.now() - 290000,
            }
        ],
        "createdAt": "2025-10-31T10:00:00.000Z",
        "updatedAt": new Date().toISOString(),
    },
    {
        "_id": "690b2g3h4i5j6k7l8m9n0o1p",
        "userId": "689c6deed410acddc0d95a0e",
        "userName": "GreatStack",
        "pdfId": DUMMY_PDF_ID,
        "pdfName": "Employee Handbook: General Policies",
        "name": "Handbook Query - Expenses",
        "messages": [
            {
                "isImage": false,
                "isPublished": false,
                "role": "user",
                "content": "What is the policy for expense reimbursement without a manager's approval?",
                "timestamp": Date.now() - 120000,
            },
            {
                "isImage": false,
                "isPublished": false,
                "role": "assistant",
                "content": "According to **Section 4: Expense Reimbursement**, business expenses under **$50** do not require a manager's prior approval, but a valid receipt is still mandatory. Expenses over $50 require a pre-approval form.",
                "timestamp": Date.now() - 110000,
            },
            {
                "isImage": false,
                "isPublished": false,
                "role": "user",
                "content": "Can I work from home 3 days a week?",
                "timestamp": Date.now() - 50000,
            },
            {
                "isImage": false,
                "isPublished": false,
                "role": "assistant",
                "content": "The document states in **Section 3: Remote Work Policy** that employees may work remotely up to **two days per week** as part of the hybrid work model. Working three days remotely is **not** covered by the standard policy.",
                "timestamp": Date.now() - 40000,
            }
        ],
        "createdAt": "2025-10-31T10:15:00.000Z",
        "updatedAt": new Date().toISOString(),
    }
];

// Add this to your existing dummyChats export
export const dummyChats = [
    // ... existing dummy chats (from your prompt) ...
    ...dummyPdfChats // Add the new PDF-specific chats here
]