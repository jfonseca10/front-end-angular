import {
  AlignmentType,
  Document,
  HeadingLevel,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TabStopPosition,
  TabStopType,
  TextRun,
  VerticalAlign
} from "docx";
import {map} from "rxjs/operators";


const PHONE_NUMBER = "07534563401";
const PROFILE_URL = "https://www.linkedin.com/in/dolan1";
const EMAIL = "docx@docx.com";

export class DocumentCreator {

  // tslint:disable-next-line: typedef

  public create([result, experiences, educations, skills, achivements]): Document {

    const {idcarrera, idperiodo, idusuario, fecha} = result
    const table = new Table({
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({
                heading: HeadingLevel.TITLE,
                alignment: AlignmentType.CENTER,
                children: [new TextRun({
                  text: 'DOCENTE TUTOR',
                  size: 21,
                  bold: true
                })],
              })],
              verticalAlign: VerticalAlign.CENTER
            }),
            new TableCell({
              children: [new Paragraph({
                heading: HeadingLevel.TITLE,
                alignment: AlignmentType.CENTER,
                children: [new TextRun({
                  text: 'ESTUDIANTES ASIGNADOS / CLASIFICACION ESTUDIANTES',
                  size: 21,
                  bold: true
                })],
              })],
              verticalAlign: VerticalAlign.CENTER
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('Alex Yepez')],
            }),
            new TableCell({
              children: [new Paragraph("World"), new Paragraph("Excel")],
            }),
          ],
        }),
      ],
    });
    const temp = [
      {profesor: 'Alex', estudiantes: ['pablo', 'diego']},
      {profesor: 'Alex1', estudiantes: ['pablo1', 'diego1']}
    ]
    temp.map(row => {
      const tableCell = []
      row.estudiantes.map(est => {
        tableCell.push(new Paragraph(est))
      })
      const tableRow = new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph(row.profesor)],
          }),
          new TableCell({
            children: tableCell,
          })
        ]
      })
      table.addChildElement(tableRow)
    })

    table.addChildElement(new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Jose ')],
        }),
        new TableCell({
          children: [new Paragraph("World1"), new Paragraph("Excel2")],
        }),
      ]
    }))
    const document = new Document();
    // const image = Media.addImage(document, "logo-distributivo.jpg");
    document.addSection({
      children: [
        new Paragraph({
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
          children: [new TextRun({
            text: 'DISTRIBUTIVO DE TUTORIAS DE ACOMPAÑAMIENTO',
            size: 24,
            bold: true
          })],
        }),
        new Paragraph({
          alignment: AlignmentType.LEFT,
          children: [
            new TextRun({
              text: 'CARRERA:  ',
              size: 18,
              bold: true
            }),
            new TextRun({
              text: idcarrera,
              size: 18
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.LEFT,
          children: [
            new TextRun({
              text: 'PERIODO:  ',
              size: 18,
              bold: true
            }),
            new TextRun({
              text: idperiodo,
              size: 18
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.LEFT,
          children: [
            new TextRun({
              text: 'DIRECTOR DE CARRERA:  ',
              size: 18,
              bold: true
            }),
            new TextRun({
              text: idusuario,
              size: 18
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.LEFT,
          children: [
            new TextRun({
              text: 'FECHA:  ',
              size: 18,
              bold: true
            }),
            new TextRun({
              text: fecha,
              size: 18
            })
          ]
        }),
        table,
        new Paragraph({
          alignment: AlignmentType.LEFT,
          children: [
            new TextRun({
              text: `Ing. ${idusuario}`,
              size: 18
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.LEFT,
          children: [
            new TextRun({
              text: `Director de escuela de ${idcarrera}`,
              size: 18
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.LEFT,
          children: []
        }),
        new Paragraph({
          alignment: AlignmentType.LEFT,
          children: [
            new TextRun({
              text: 'Ing. Sylvia Llumiquinga Msc.',
              size: 18
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.LEFT,
          children: [
            new TextRun({
              text: 'Responsable de Tutorias',
              size: 18
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.LEFT,
          children: [
            new TextRun({
              text: `Escuela de ${idcarrera}`,
              size: 18
            })
          ]
        })
      ],
    });
    return document;
  }

  public createContactInfo(phoneNumber: string, profileUrl: string, email: string): Paragraph {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun(`Mobile: ${phoneNumber} | LinkedIn: ${profileUrl} | Email: ${email}`),
        new TextRun("Address: 58 Elm Avenue, Kent ME4 6ER, UK").break(),
      ],
    });
  }

  public createHeading(text: string): Paragraph {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_1,
      thematicBreak: true,
    });
  }

  public createSubHeading(text: string): Paragraph {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_2,
    });
  }

  public createInstitutionHeader(institutionName: string, dateText: string): Paragraph {
    return new Paragraph({
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: TabStopPosition.MAX,
        },
      ],
      children: [
        new TextRun({
          text: institutionName,
          bold: true,
        }),
        new TextRun({
          text: `\t${dateText}`,
          bold: true,
        }),
      ],
    });
  }

  public createRoleText(roleText: string): Paragraph {
    return new Paragraph({
      children: [
        new TextRun({
          text: roleText,
          italics: true,
        }),
      ],
    });
  }

  public createBullet(text: string): Paragraph {
    return new Paragraph({
      text: text,
      bullet: {
        level: 0,
      },
    });
  }

  // tslint:disable-next-line:no-any
  public createSkillList(skills: any[]): Paragraph {
    return new Paragraph({
      children: [new TextRun(skills.map((skill) => skill.name).join(", ") + ".")],
    });
  }

  // tslint:disable-next-line:no-any
  public createAchivementsList(achivements: any[]): Paragraph[] {
    return achivements.map(
      (achievement) =>
        new Paragraph({
          text: achievement.name,
          bullet: {
            level: 0,
          },
        }),
    );
  }

  public createInterests(interests: string): Paragraph {
    return new Paragraph({
      children: [new TextRun(interests)],
    });
  }

  public splitParagraphIntoBullets(text: string): string[] {
    return text.split("\n\n");
  }

  // tslint:disable-next-line:no-any
  public createPositionDateText(startDate: any, endDate: any, isCurrent: boolean): string {
    const startDateText = this.getMonthFromInt(startDate.month) + ". " + startDate.year;
    const endDateText = isCurrent ? "Present" : `${this.getMonthFromInt(endDate.month)}. ${endDate.year}`;

    return `${startDateText} - ${endDateText}`;
  }

  public getMonthFromInt(value: number): string {
    switch (value) {
      case 1:
        return "Jan";
      case 2:
        return "Feb";
      case 3:
        return "Mar";
      case 4:
        return "Apr";
      case 5:
        return "May";
      case 6:
        return "Jun";
      case 7:
        return "Jul";
      case 8:
        return "Aug";
      case 9:
        return "Sept";
      case 10:
        return "Oct";
      case 11:
        return "Nov";
      case 12:
        return "Dec";
      default:
        return "N/A";
    }
  }
}
