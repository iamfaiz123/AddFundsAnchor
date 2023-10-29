use anchor_lang::prelude::*;
use anchor_lang::system_program::ID;


#[program]
pub mod jackpotfunds {
    use super::*;

    pub fn add_funds(ctx: Context<AddFunds>, amount: u64) -> Result<()> {
        let jackpot_funds = &mut ctx.accounts.jackpot_funds;
        jackpot_funds.funds += amount;
        Ok(())
    }

    pub fn get_funds(ctx: Context<GetFunds>) -> Result<u64> {
        let jackpot_funds = &ctx.accounts.jackpot_funds;
        Ok(jackpot_funds.funds)
    }
}

#[derive(Accounts)]
pub struct AddFunds<'info> {
    #[account(mut)]
    pub jackpot_funds: Account<'info, JackpotFunds>,
}

#[derive(Accounts)]
pub struct GetFunds<'info> {
    pub jackpot_funds: Account<'info, JackpotFunds>,
}

#[account]
pub struct JackpotFunds {
    pub funds: u64,
}