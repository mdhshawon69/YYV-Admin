import { PortfolioService } from './portfolio.service';
import { Request, Response } from 'express';
import {
  Controller,
  Get,
  Res,
  Post,
  Body,
  UseInterceptors,
  Req,
  UploadedFile,
  Param,
  Query,
  Put,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileUpload } from 'src/config/multer.config';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  async getAllPortfolios(@Res() res: Response, @Query('keywords') keywords) {
    const allPortfolios = await this.portfolioService.getAllPortfolios();
    const allPortfoliosRow = [];
    allPortfolios.forEach((item) => {
      const tempItem = { ...item };
      tempItem.company_logo = `${process.env.BASE_URL}/uploads/portfolio/${item.company_logo}`;
      allPortfoliosRow.push(tempItem);
    });
    const filteredPortfolios = allPortfoliosRow.filter((portfolio) => {
      return portfolio?.company_name
        .toLowerCase()
        .includes(keywords?.toLowerCase());
    });
    return res.render('portfolio/list', {
      layout: 'main',
      row: !keywords ? allPortfoliosRow : filteredPortfolios,
    });
  }

  //Get all Portfolios API Controller
  @Get('api')
  async getAllPortfoliosApi(@Res() res: Response) {
    const allPortfolios = await this.portfolioService.getAllPortfolios();
    const allPortfoliosRow = [];
    allPortfolios.forEach((item) => {
      const tempItem = { ...item };
      tempItem.company_logo = `uploads/portfolio/${item.company_logo}`;
      allPortfoliosRow.push(tempItem);
    });
    return res.json({ data: allPortfoliosRow });
  }

  //Get create Portfolio form CMS Controller
  @Get('create-Portfolio')
  async getCreatePortfolio(@Res() res: Response) {
    return res.render('portfolio/create', { layout: 'main' });
  }

  //Post create Portfolio CMS Controller
  @Post('create-portfolio')
  @UseInterceptors(FileInterceptor('file', fileUpload(`portfolio`)))
  async createPortfolio(
    @Body() body,
    @Res() res: Response,
    @Req() req: Request,
    @UploadedFile() file,
  ) {
    try {
      const createdPortfolio = await this.portfolioService.createPortfolio({
        type: body.portfolio_type,
        company_name: body.company_name,
        company_logo: file.filename,
        company_link: body.company_link,
      });
      console.log(createdPortfolio);
      return res.json({
        status: 'success',
        message: 'Successfully created Portfolio!',
      });
    } catch (error) {
      return res.json({
        status: 'Failed',
        message: error.message,
      });
    }
  }

  //Get Portfolio edit form CMS Controller
  @Get('edit-portfolio')
  async getEditPortfolio(@Query('id') id, @Res() res: Response) {
    const viewingPortfolio = await this.portfolioService.viewPortfolio(id);
    return res.render('portfolio/update', {
      layout: 'main',
      data: {
        type: viewingPortfolio.type,
        company_name: viewingPortfolio.company_name,
        company_link: viewingPortfolio.company_link,
        company_logo_source: viewingPortfolio.company_logo,
        company_logo: `${process.env.BASE_URL}/uploads/Portfolio/${viewingPortfolio.company_logo}`,
      },
    });
  }

  //Edit Portfolio CMS Controller
  @Put('edit-portfolio/:id')
  @UseInterceptors(FileInterceptor('file', fileUpload(`portfolio`)))
  async editPortfolio(
    @Body() body,
    @Param('id') id,
    @Res() res: Response,
    @UploadedFile() file,
  ) {
    console.log(file);
    try {
      const editedPortfolio = await this.portfolioService.editPortfolio(id, {
        type: body.type,
        company_name: body.company_name,
        company_link: body.company_link,
        company_logo: file?.filename,
      });
      res.json({
        status: 'success',
        message: 'Successfully edited the Portfolio!',
      });
    } catch (error) {
      res.json({ status: 'failed', message: 'Cannot edit the Portfolio' });
    }
  }

  //Delete Portfolio CMS Controller
  @Post(':id')
  async deletePortfolio(@Param('id') id, @Res() res: Response) {
    try {
      const deletedPortfolio = await this.portfolioService.deletePortfolio(id);
      return res.json({
        status: 'Success',
        message: 'Portfolio deleted successfully!',
      });
    } catch (error) {
      return res.json({
        status: 'Failed',
        message: error.message,
      });
    }
  }
}
